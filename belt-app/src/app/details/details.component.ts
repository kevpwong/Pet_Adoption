import { Component, OnInit } from '@angular/core';
import { BeltService } from './../belt.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router'; //for passing in id parameter and rerouting

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
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
  like(petid, likes){
    likes++;
    let tempObservable= this._beltService.like({id:petid, likes: likes});
    tempObservable.subscribe(data =>{
      this.getPet(this._id);
    });
  }
  removePet(id: string){
    let tempObservable=this._beltService.removePet(id);
        tempObservable.subscribe(data =>{
          this._router.navigate(['/home/']);
      });
  }
}
