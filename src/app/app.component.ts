import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SocketService } from './socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns = ['id', 'name', 'gender', 'oldValue', 'newValue'];
  dataSource = [];
  actionMessage = '';

  constructor(
    private socketService: SocketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.socketService.onEvent('data_update').subscribe((data) => {
      console.log('Data received:', data);

      const actionType = data.action;

      if (actionType === 'UPDATE') {
        this.actionMessage = 'Datos actualizados';
      } else if (actionType === 'DELETE') {
        this.actionMessage = 'Datos eliminados';
      } else if (actionType === 'INSERT') {
        this.actionMessage = 'Datos agregados';
      }
      //PUSH DE DATA
      this.dataSource = data.friends;

      this.snackBar.open(this.actionMessage, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }
}