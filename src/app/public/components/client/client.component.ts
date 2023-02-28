import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { ClientRes, ClientReq } from 'src/app/models/client.model';
import { ClientService } from 'src/app/shared/services/client.service';
import { AppDataState, DataStateEnum } from 'src/app/shared/state/data.model';
import { DialogClientComponent } from '../dialogs/dialog-client/dialog-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  clients$!: Observable<AppDataState<ClientRes[]>>;
  DataStateEnum: typeof DataStateEnum = DataStateEnum;

  constructor(private api: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.clients$ = this.api.getAllClient().pipe(
      map((data) => {
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((e) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: e.message })
      )
    );
  }
  addClient() {
    const dialogRef = this.dialog.open(DialogClientComponent);
    dialogRef.afterClosed().subscribe((req: ClientReq) => {
      if (req) {
        this.api.addClient(req).subscribe(() => {
          this.getAllClients();
        });
      }
    });
  }
  deleteClient(fr: ClientRes) {
    const deleteDialog = this.dialog.open(DialogClientComponent, {
      data: { action: 'delete', form: fr },
    });
    deleteDialog.afterClosed().subscribe((req: ClientRes) => {
      if (req) {
        this.api.deleteClientById(fr.id).subscribe((res) => {
          this.getAllClients();
        });
      }
    });
  }
  updateClient(clt: ClientRes) {
    const editDialog = this.dialog.open(DialogClientComponent, {
      data: { action: 'update', form: clt },
    });
    editDialog.afterClosed().subscribe((req: ClientRes) => {
      if (req) {
        this.api.updateClient(req, clt.id).subscribe((res) => {
          this.getAllClients();
        });
      }
    });
  }
}
