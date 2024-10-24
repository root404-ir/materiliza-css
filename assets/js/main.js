document.addEventListener('DOMContentLoaded', () => {
    var elems = document.querySelector('.sidenav')
    var instance = M.Sidenav.init(elems, {})

    // console.log(6)

    // new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         console.log(7)
    //         resolve('ok')
    //     }, 1000)
    // }).then(
    //     (response) => {
    //         console.log(8)
    //     }
    // )


    // setTimeout(() => {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then((response) => response.json())
    //         .then((json) => {

    //             let html = ""
    //             for (const user of json) {

    //                 html += `<tr>
    //                         <td>${user.id}</td>
    //                         <td>${user.name}</td>
    //                         <td>${user.username}</td>
    //                         <td>${user.email}</td>
    //                         <td>${user.address.street}</td>
    //                         <td>
    //                             <i class="material-icons text-red mr-5 ml-5">delete_forever</i>
    //                             <i class="material-icons text-orange">edite</i>
    //                         </td>
    //                     </tr>`
    //                 document.querySelector('.rrr').innerHTML = html
    //             }

    //         })

    // }, 2000)



})
