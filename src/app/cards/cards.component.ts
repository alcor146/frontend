import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service.cards';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  records: any = [];
  filterTerm: string = "";
  page: any;
  count: number = 0;
  tableSize: number = 7;
  tableSizes : Array<number> = [3, 6, 9, 12]

  constructor(private http: HttpClient, private dialogService: DialogService) { 
    
  }

  ngOnInit(): void {
    this.showCards();
  }

  onTableDataChange(event: any){
    this.page = event;
    this.showCards();
  }  

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.showCards();
  }

  showCards(){

      this.http.get('http://localhost:3001/api/cards')
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        console.log(jsonDB);
        this.records = jsonDB.data;
      })
  }
  
  openDeleteDialog(record: any){
    
    this.dialogService.confirmDialog({
    
      message: "Are you sure you want to delete this?", 
      confirmText: 'Yes',
      cancelText: 'No'
    }).subscribe( ( result ) => {  
      if(result.toString() == "true"){
        console.log(record)   
        this.http.delete(`http://localhost:3001/api/cards/${record._id}`)
        .subscribe((res) =>{
          console.log(res);
        })
      } else {
        console.log("NUUUUUUUUU");
      }
    });

  }

  openEditDialog(record: any){
    
    this.dialogService.editDialog({
      id: record._id,
      title: "edit dialog",
      bank: record.bank,
      cardNumber: record.cardNumber,
      expirationMonth: record.expirationMonth,
      expirationYear: record.expirationYear,
      securityCode: record.securityCode,
      confirmText: 'Edit'
    }).subscribe( ( newCard ) => {  
      console.log(newCard)
      if(newCard.confirmText.toString() == "Edit"){   
        this.dialogService.confirmDialog({
          message: "Are you sure you want to edit this?", 
          confirmText: 'Yes',
          cancelText: 'No'
        }).subscribe( ( result ) => {  
          if(result.toString() == "true"){   
            console.log("record edited");
            let body = {
              "bank": newCard.bank,
              "cardNumber": newCard.cardNumber,
              "expirationMonth": newCard.expirationMonth,
              "expirationYear": newCard.expirationYear,
              "securityCode": newCard.securityCode,
            }

            this.http.put(`http://localhost:3001/api/cards/${record._id}`, body)
            .subscribe((res) => {
              console.log(res)
            });

          } else {
            console.log("NUUUUUUUUU edit");
          }
        });
      } else {
        console.log("NUUUUUUUUU");
      }
    });

  }

  

  openCreateDialog(){
  
    this.dialogService.createDialog({
      title: "create dialog",
      bank: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      securityCode: "",
      confirmText: 'Create'
    }).subscribe( ( newCard ) => {  
      console.log(newCard)
      if(newCard.confirmText.toString() == "Create"){   
        let body = {
          "bank": newCard.bank,
          "cardNumber": newCard.cardNumber,
          "expirationMonth": newCard.expirationMonth,
          "expirationYear": newCard.expirationYear,
          "securityCode": newCard.securityCode,
        }

        this.http.post(`http://localhost:3001/api/cards`, body)
        .subscribe((res) =>{
          console.log(res)
        })

      } else {
        console.log("NUUUUUUUUU");
      }
    });
  }
}
