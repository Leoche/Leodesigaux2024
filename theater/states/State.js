
class State {
    constructor() {
    }
    create(){
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    enter(){
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    leave(){
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    animate(time){
    }
}

export { State };