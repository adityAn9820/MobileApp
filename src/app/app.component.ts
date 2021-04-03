import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { CapacitorSQLite,  } from '@capacitor-community/sqlite';
import { CapacitorSqliteService } from 'Services/capacitor-sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements  OnInit{
    isService: boolean = false;
    platform: string;

  constructor(private capacitorSqliteService:CapacitorSqliteService) {}

  ngOnInit() {
    this.capacitorSqliteService.initializePlugin();
  }

}
