import { useEffect } from "react";

function useLocalStorage(key, valorInicial) {
    const [valor, setValor] = useState(() => {
        // funcion para guardar el valor
        const datosGuardados = localStorage.getItem(key); // obtener datos por llave
        return datosGuardados // validacion de datos
            ? JSON.parse(datosGuardados) // convertir a objeto de js
            : valorInicial; // si no hay datos, se guarda el valor inicial
    });

    useEffect(() => {
        //funcion que se ejcuatara cada vez que cambie el valor
        localStorage.setItem(
            key, // selecciona la llave
            JSON.stringify(valor) // convertir de js u objeto a JSON
        );
    }, [key, valor]); // se ejecuta cada vez que cambia el valor y se inicializa el key

    // SE USA EN EL CONTEXT 
    // const [urls, setUrls] = useLocalStorage("urls", []); // se inicializa el valor de urls como un array vacio]

    return [valor, setValor];
}

export default localStorage;

//// guardar
//localStorage.setItem('llave', 'valor');
//localStorage.setItem('llave');
//localStorage.setItem('llave', {'saludo': 'hola'});
//localStorage.setItem('llave', ['hola','mundo']);
//localStorage.setItem('llave', [
//    { 'saludo': 'hola' },
//    { 'saludo': 'mundo' }
//]);
//// obtener
//localStorage.getItem('llave');
//// limpiaritem
//localStorage.removeItem('llave');
//// limpiar el local storage completo
//localStorage.clear();
