import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { DialogService } from '../services/dialog.service.cards';
import { RBACService } from '../_helpers/rbac';
import { AuthService } from '../_services/auth.service';


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
  role: string = ""
  user: string = ""


  constructor(private http: HttpClient, private dialogService: DialogService, private rbacService: RBACService, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
    this.getRoles();
   
  }

  getRoles(){
    this.rbacService.getRoles().subscribe((data) =>{
   
      if(data.status == "200"){
        this.user = data.token.userId
        this.role = data.token.role
        this.showCards();
      }else{
        this.authService.logOut()
        window.location.reload();
      }
    })
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
    console.log(this.user )
    if(this.role == "basic"){
      this.http.post('http://localhost:3001/api/cards/user', {createdBy: this.user})
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        console.log(jsonDB);
        this.records = jsonDB.data;
      })
    }else if(this.role == "admin"){
      this.http.get('http://localhost:3001/api/cards')
      .subscribe((res) => {
        let jsonString = JSON.stringify(res);
        let jsonDB = JSON.parse(jsonString);
        console.log(jsonDB);
        this.records = jsonDB.data;
      })
    } else{
      console.log("not an admin or user")
    }
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
          this.showCards();
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
      cardName: record.cardName,
      expirationDate: record.expirationDate,
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
              "cardName": newCard.cardName,
        
              "expirationDate": newCard.expirationDate,
              "securityCode": newCard.securityCode,
            }

            this.http.put(`http://localhost:3001/api/cards/${record._id}`, body)
            .subscribe((res) => {
              console.log(res)
              this.showCards();
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
      cardName: "",
      expirationDate: "",
      securityCode: "",
      confirmText: 'Create'
    }).subscribe( ( newCard ) => {  
      console.log(newCard)
      if(newCard.confirmText.toString() == "Create"){   
        let body = {
          "createdBy": this.user,
          "bank": newCard.bank,
          "cardNumber": newCard.cardNumber,
          "cardName": newCard.cardName,
          "expirationDate": newCard.expirationDate,
          "securityCode": newCard.securityCode,
        }

        this.http.post(`http://localhost:3001/api/cards`, body)
        .subscribe((res) =>{
          console.log(res)
          this.showCards();
        })

      } else {
        console.log("NUUUUUUUUU");
      }
    });
  }


}

  

