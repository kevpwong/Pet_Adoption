import { Component, OnInit } from '@angular/core';
import { BeltService } from './../belt.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  Name:string;
  Type:string;
  Description:string;
  Skill1:string;
  Skill2:string;
  Skill3:string;
  error=false;
  errorMessage = [];

  constructor(
    private _beltService: BeltService, 
    private _router: Router,     
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  add(){
    let tempObservable= this._beltService.newPet({name: this.Name, type: this.Type, description: this.Description, skill1: this.Skill1, skill2: this.Skill2, skill3: this.Skill3});
    tempObservable.subscribe(data =>{
      if (data['error']){
        this.error = true;
        this.errorMessage = [];
        if (data['error']['errors']['name']){
          this.errorMessage.push(data['error']['errors']['name']['message']);
        }
        if (data['error']['errors']['type']){
          this.errorMessage.push(data['error']['errors']['type']['message']);
        }
        if (data['error']['errors']['description']){
          this.errorMessage.push(data['error']['errors']['description']['message']);
        }
        
      } else {
        this._router.navigate(['/home']);
      }
    })
  }
  cancel(){
    this._router.navigate(['/home']);
  }
}
