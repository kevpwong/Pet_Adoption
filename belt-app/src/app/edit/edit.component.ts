import { Component, OnInit } from '@angular/core';
import { BeltService } from './../belt.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router'; //for passing in id parameter and rerouting


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  pet: {};
  _id: any;
  constructor(
    private _beltService: BeltService,
    private _route: ActivatedRoute, 
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log('paramassssss', params['id']);
      this._id=params['id'];
      this.getPet(this._id);
    });
  }
  getPet(id:string){
    let tempObservable=this._beltService.getPet(id);
    tempObservable.subscribe(data =>{
      this.pet = data['data'];
    })
  }
  update(petId: String, pet: any){
    let tempObservable = this._beltService.update(petId, pet);
    tempObservable.subscribe(data=>{
      this._router.navigate(['/details/'+this._id]);
    })
  }
  cancel(){
    this._router.navigate(['/details/'+this._id]);
  }
}
