const myVariable = null;
const defaultValue = 'Valor por defecto';

const result = myVariable ?? defaultValue;

console.log(result); // 'Valor por defecto'



class MiClase {
    #variablePrivada = 'Soy una variable privada';
  
    #metodoPrivado() {
      console.log('Soy un método privado');
    }
  
    metodoPublico() {
      console.log(this.#variablePrivada);
      this.#metodoPrivado();
    }
  }
  
  const instancia = new MiClase();
  instancia.metodoPublico();
  