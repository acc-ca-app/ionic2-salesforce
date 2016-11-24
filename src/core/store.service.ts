import {Injectable} from '@angular/core'

@Injectable()
export class StoreService {
  private store: {} = {}

  constructor() {

  }

  create(type, el) {
    if(!Array.isArray(el)) el = [el]
    this.store[type] = this.store[type] || []
    this.store[type].push(...el)
  }
  read(type?) {
    if(type) {
      return this.store[type]
    } else {
      return this.store
    }
  }
  update(type, el) {
    this.store[type] = this.store[type] || []
    const index = this.store[type].findIndex((it) => it && it._id===el._id)
    if(index>=0) {
      this.store[type].splice(index, 1, el)
    }
  }
  delete(type, _id) {
    this.store[type] = this.store[type] || []
    const index = this.store[type].findIndex((it) => it && it._id===_id)
    if(index>=0) {
      this.store[type].splice(index, 1)
    }
  }
}
