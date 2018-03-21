import { Component, OnInit } from '@angular/core';
import { BeltService } from './../belt.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pets: any[];

  constructor(
    private _beltService: BeltService, 
    private _router: Router,     
    private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.showPets();

  }
  showPets(){
    let tempObservable=this._beltService.allPets();
    tempObservable.subscribe(data =>{
      this.pets = data['data'];
      this.pets.sort(function(a, b){
        if(a.type < b.type) return -1;
        if(a.type > b.type) return 1;
        return 0;
      })
    })
  }
  remove(id: string, name: string){
    if (confirm("Are you sure you want to delete "+ name +"?")) {
      let tempObservable=this._beltService.removePet(id);
        tempObservable.subscribe(data =>{
        this.showPets();
      });
    } else {
        console.log( "You pressed Cancel!");
    }
  }
  details(id:string){
    this._router.navigate(['/details/'+id]);
  }
  edit(id:string){
    this._router.navigate(['/edit/'+id]);
  }
}
