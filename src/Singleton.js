class Singleton {
    constructor() {
      if (typeof Singleton.instance === 'object') {
        return Singleton.instance;
      }
  
      Singleton.instance = this;
  
      return this;
    
    
    
    }
    

    reset(params) {

    }



}
  
export default Singleton