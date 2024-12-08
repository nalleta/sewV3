
class Relaciones{
    constructor() {
        this.elementos = [
            { circuito: "Sakhir", pais: "Bahrein" },
            { circuito: "Jeddah", pais: "Arabia Saudí" },
            { circuito: "Albert Park", pais: "Australia" },
            { circuito: "Suzuka", pais: "Japón" },
            { circuito: "Shanghái", pais: "China" },
            { circuito: "Miami International Autodrome", pais: "Estados Unidos" },
            { circuito: "Autódromo Enzo e Dino Ferrari", pais: "Italia" },
            { circuito: "Monte Carlo", pais: "Mónaco" },
            { circuito: "Circuito Gilles Villeneuve", pais: "Canadá" },
            { circuito: "Montmeló", pais: "España" },
            { circuito: "Red Bull Ring", pais: "Austria" },
            { circuito: "Silverstone", pais: "Reino Unido" },
            { circuito: "Hungaroring", pais: "Hungría" },
            { circuito: "Spa-Francorchamps", pais: "Bélgica" },
            { circuito: "Zandvoort", pais: "Países Bajos" },
            { circuito: "Monza", pais: "Italia" },
            { circuito: "Bakú", pais: "Azerbaiyán" },
            { circuito: "Marina Bay", pais: "Singapur" },
            { circuito: "Circuito de Las Américas", pais: "Estados Unidos" },
            { circuito: "Autódromo Hermanos Rodríguez", pais: "México" },
            { circuito: "Autódromo de Interlagos", pais: "Brasil" },
            { circuito: "Las Vegas Street Circuit", pais: "Estados Unidos" },
            { circuito: "Losail", pais: "Catar" },
            { circuito: "Yas Marina", pais: "Emiratos Árabes Unidos" }
        ];
        this.restart();
        
    }

    restart(){
        Array.from($("main section:nth-of-type(2) article")).forEach(element => {
            element.remove();
        });
        Array.from($("main section:nth-of-type(3) article")).forEach(element => {
            element.remove();
        });
        
        this.shuffleElements();

        this.paises = this.elementos.map(elemento => elemento.pais);
        this.circuitos = this.elementos.map(elemento => elemento.circuito);

        this.shuffleComponents();


        this.initListeners();
    }

    shuffleElements(){
        let currentIndex = this.elementos.length;
        while (currentIndex !== 0) {
            // Pick a remaining element
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element
            let temporaryValue = this.elementos[currentIndex];
            this.elementos[currentIndex] = this.elementos[randomIndex];
            this.elementos[randomIndex] = temporaryValue;
        }

        if(this.elementos.length>24){
            this.elementos = this.elementos.slice(0,24);
        }
    }

    shuffleComponents(){

        let currentIndex = this.paises.length;
        while (currentIndex !== 0) {
            // Pick a remaining element
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element
            let temporaryValue = this.paises[currentIndex];
            this.paises[currentIndex] = this.paises[randomIndex];
            this.paises[randomIndex] = temporaryValue;
        }

        currentIndex = this.elementos.length;
        while (currentIndex !== 0) {
            // Pick a remaining element
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element
            let temporaryValue = this.circuitos[currentIndex];
            this.circuitos[currentIndex] = this.circuitos[randomIndex];
            this.circuitos[randomIndex] = temporaryValue;
        }
    }

    initListeners(){
        var section1 = document.querySelector("main section:nth-of-type(2)");
        var section2 = document.querySelector("main section:nth-of-type(3)");

        this.circuitos.forEach(element => {
            var article = document.createElement("article");
            var p = document.createElement("p");
            article.draggable = true;
            p.innerText = element;

            article.addEventListener('dragstart', this.dragStart.bind(this));

            article.appendChild(p)
            section1.appendChild(article);
        });

        this.paises.forEach(element => {
            var article = document.createElement("article");
            var p = document.createElement("p");
            article.draggable = true;
            p.innerText = element;
            
            article.addEventListener('dragover', dragOver);
            article.addEventListener('dragenter', dragEnter);
            article.addEventListener('dragleave', dragLeave);
            article.addEventListener('drop', this.drop.bind(this));

            article.appendChild(p)
            section2.appendChild(article);
        });
    }

    drop(event) {
        event.preventDefault();
        event.target.classList.remove('hover');
        this.elementos.forEach(elemento => {
            console.log(elemento.pais + " " + event.target.innerText + " / " + elemento.circuito + " " + event.dataTransfer.getData('text/plain'));
            console.log(elemento.pais == event.target.innerText);
            console.log(elemento.circuito == event.dataTransfer.getData('text/plain'));
            if(elemento.pais === event.target.innerText && elemento.circuito === event.dataTransfer.getData('text/plain')){
                Array.from($("main section:nth-of-type(2) article")).forEach(element => {
                    console.log(element.innerText + " || " + event.dataTransfer.getData('text/plain'));
                    if(element.innerText === event.dataTransfer.getData('text/plain')){
                        event.target.appendChild($("p", element).get(0));
                        element.remove();   
                    }
                });
            }
        });
    }

    dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.innerText);
    }

    readInputFile(file) {
        file = file[0];
        var tipoTexto = /text.*/;
        if (file.type.match(tipoTexto)) 
        {
            var lector = new FileReader();
            lector.onload = function () {
                var result = lector.result;
                var lineas = result.split("\n");
                this.elementos = [];
                lineas.forEach(linea => {
                    linea = linea.trim("\r");
                    var componentes = linea.split("_");
                    this.elementos = this.elementos.concat([{ circuito: componentes[0], pais: componentes[1] }]);
                });
                this.restart();
            }.bind(this);
            lector.readAsText(file);
        }
        else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }  
    }
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add('hover');
}

function dragLeave(event) {
    event.target.classList.remove('hover');
}