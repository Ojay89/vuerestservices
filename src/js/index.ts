import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IBook {
    id: Number;
    title: String;
    author: String;
    publisher: String;
    price: Number;
}

let baseUrl: string = "http://anbo-bookstorerest.azurewebsites.net/api/Books"

new Vue({
    el: "#app",
    data: {
        books: [],
        errorMessage: "",
        formData: {
            id: 0,
            title: "",
            author: "",
            publisher: "",
            price: 0
        },
        addMessage: "",
        deleteId: "",
        deleteMessage: ""
    },

    methods: {
        getAllBooks() {
            console.log("getAllBooks")
            axios.get<IBook[]>(baseUrl)
                .then((response: AxiosResponse<IBook[]>) => {
                    console.log(response.data)
                    this.books = response.data
                })

                .catch((error: AxiosError) => {
                    this.errorMessage = error.message
                })
        },
        addBook() {
            axios.post<IBook>(baseUrl, this.formData)
                .then((response: AxiosResponse<IBook>) => {
                    console.log(response.data)
                    this.addMessage = "Book Added"
                    this.getAllBooks()

                })
                .catch((error: AxiosError) => {
                    this.errorMessage = error.message
                })
        },
        deleteBook(deleteId: number) {
            let uri: string = baseUrl + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = "Book deleted"
                    this.getAllBooks()
                })
                .catch((error: AxiosError) => {
                    this.errorMessage = error.message
                })
        }
    }
})







// // function ShowBooks(): void {
// //     axios.get<IBook[]>(baseUri)
// //     .then(function(response: AxiosResponse<IBook[]>): void {

// //         //Virker fint, men ser grimt ud
// //         // let result: string ="<ul id='booklist' class='list-group' >";
// //         // response.data.forEach((book: IBook) => {
// //         //     result += "<li style='margin: 5px; background: lightgrey;' class='list-group-item'>" + "<b>Book ID: </b>" + book.id + " " + "<br><b>Title: </b>" + "<i>" + book.title + "</i>" + " " +  "<br><b>Author: </b>" + book.author + " " + "<br><b>Publisher: </b>" + book.publisher + " " + "<br><b>Price: </b>" + book.price + " kr." + "</li>";
// //         // });
// //         // result += "</ul>";
// //         // outputElement.innerHTML = result;
// //         let langHTML = json2table100(response.data)
// //         console.log(langHTML);
// //         outputElement.innerHTML = langHTML;
// //     })

// //     .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
// //         if (error.response) {
// //             // the request was made and the server responded with a status code
// //             // that falls out of the range of 2xx
// //             // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
// //             outputElement.innerHTML = error.message;
// //         } else { // something went wrong in the .then block?
// //             outputElement.innerHTML = error.message;
// //         }
// //     });
// // }

// // export function json2table100(json: any): string {
// //     let cols: string[] = Object.keys(json[0]);
// //     let headerRow: string = "";
// //     let bodyRows: string = "";
// //     cols.forEach((colName: string) => {
// //         headerRow += "<th>" + capitalizeFirstLetter(colName) + "</th>"
// //     });
// //     json.forEach((row: any) => {
// //         bodyRows += "<tr>";
// //         // loop over object properties and create cells
// //         cols.forEach((colName: string) => {
// //             bodyRows += "<td>" + (typeof row[colName] === "object" ? JSON.stringify(row[colName]) : row[colName]) + "</td>";
// //         });
// //         bodyRows += "</tr>";
// //     });
// //     return "<table><thead><tr>" +
// //         headerRow +
// //         "</tr></thead><tbody style='margin-left: 100px;'>" +
// //         bodyRows +
// //         "</tbody></table>";
// // }

// // export function capitalizeFirstLetter(str: string): string {
// //     return str.charAt(0).toUpperCase() + str.slice(1);
// }