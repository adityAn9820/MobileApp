import { Injectable } from '@angular/core';
import { Plugins,Capacitor } from '@capacitor/core';

const { CapacitorSQLite } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CapacitorSqliteService {

  sqlite: any;
  isService: boolean = false;
  platform: string;

  constructor() { }

  initializePlugin(): Promise<boolean> {
    return new Promise (resolve => {
        this.platform = Capacitor.getPlatform();
        console.log("*** platform " + this.platform)
        const sqlitePlugin: any = CapacitorSQLite;
        this.isService = true;
        console.log("$$$ in service this.isService " + this.isService + " $$$")
        resolve(true);
    });
  }

  async testSQLitePlugin() {
    this.sqlite=CapacitorSQLite;
    let result:any = await this.sqlite.open({database:"testsqlite"});
    const retOpenDB = result.result;
    if(retOpenDB) {
        // Create Tables if not exist
        let sqlcmd: string = `
        BEGIN TRANSACTION;
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY NOT NULL,
            email TEXT UNIQUE NOT NULL,
            name TEXT,
            FirstName TEXT,
            age INTEGER,
            MobileNumber TEXT
        );
        PRAGMA user_version = 1;
        COMMIT TRANSACTION;
        `;
        var retExe: any = await this.sqlite.execute({statements:sqlcmd});
        // Insert some Users
        sqlcmd = `
        BEGIN TRANSACTION;
        DELETE FROM users;
        INSERT INTO users (name,email,age) VALUES ("Whiteley","Whiteley.com",30);
        INSERT INTO users (name,email,age) VALUES ("Jones","Jones.com",44);
        COMMIT TRANSACTION;
        `;
        retExe = await this.sqlite.execute({statements:sqlcmd});
        // will print the changes  2 in that case
        console.log('retExe ',retExe.changes.changes);
        // Select all Users
        sqlcmd = "SELECT * FROM users";
        let retSelect: any = await this.sqlite.query({statement:sqlcmd,values:[]});
        console.log('retSelect.values.length ',retSelect.values.length);
        const row1: any = retSelect.values[0];
        console.log("row1 users ",JSON.stringify(row1))
        const row2: any = retSelect.values[1];
        console.log("row2 users ",JSON.stringify(row2))

        // Insert a new User with SQL and Values

        sqlcmd = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
        let values: Array<any>  = ["Simpson","Simpson@example.com",69];
        var retRun: any = await this.sqlite.run({statement:sqlcmd,values:values});
        console.log('retRun ',retRun.changes.changes,retRun.changes.lastId);

        // Select Users with age > 35
        sqlcmd = "SELECT name,email,age FROM users WHERE age > ?";
        retSelect = await this.sqlite.query({statement:sqlcmd,values:["35"]});
        console.log('retSelect ',retSelect.values.length);

        // Execute a Set of raw SQL Statements
        let set: Array<any>  = [
          { statement:"INSERT INTO users (name,FirstName,email,age,MobileNumber) VALUES (?,?,?,?,?);",
            values:["Blackberry","Peter","Blackberry@example.com",69,"4405060708"]
          },
          { statement:"INSERT INTO users (name,FirstName,email,age,MobileNumber) VALUES (?,?,?,?,?);",
            values:["Jones","Helen","HelenJones@example.com",42,"4404030201"]
          },
          { statement:"INSERT INTO users (name,FirstName,email,age,MobileNumber) VALUES (?,?,?,?,?);",
            values:["Davison","Bill","Davison@example.com",45,"4405162732"]
          },
          { statement:"INSERT INTO users (name,FirstName,email,age,MobileNumber) VALUES (?,?,?,?,?);",
            values:["Brown","John","Brown@example.com",35,"4405243853"]
          },
          { statement:"UPDATE users SET age = ? , MobileNumber = ? WHERE id = ?;",
            values:[51,"4404030237",2]
          }
    ];

    }
  }
}
