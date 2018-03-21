import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BeltService {

  constructor(private _http: HttpClient) { }
  allPets(){
    return this._http.get("/allPets");
  }
  getPet(_id: String){
    console.log('get pet on service.ts');
    return this._http.get("/getPet/"+_id);
  }
  newPet(newPet: {}){
    console.log("belt.service")
    return this._http.post('/newPet/', newPet);
  }
  removePet(_id: String){
    return this._http.delete('/removePet/'+_id);
  }
  update(petId: String, editPet: {}){
    return this._http.put('/editPet/'+petId, editPet);
  }
  like(likes: {}){
    console.log('liking on service.ts')
    return this._http.post("/like/", likes);
  }
}
