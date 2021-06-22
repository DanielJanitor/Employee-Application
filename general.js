/*                             Author: Daniel Janitor                               */
/*                             Year: 2021 - June                                    */ 
/*                             Application: EMPLOYEE MANAGEMENT APPLICATION         */
/*                             TABS & DATE JAVASCRIPT                               */

//Links and Content activation
    const links = document.querySelectorAll('.link');
    const contents = document.querySelectorAll('.cont');

    links.forEach(link => {
            link.addEventListener('click', () => {
                links.forEach(item => {
                    item.classList.remove('activeLink')
                })
                link.classList.add('activeLink');

                let valueofId = link.getAttribute('id');
                contents.forEach(cont => {
                    if (cont.classList.contains(valueofId)) {
                        cont.classList.add('activeContent-section');
                    } else {
                        cont.classList.remove('activeContent-section');
                    }
                })
            })
        });

//Date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear();
    let day = `${dd}.${mm}.${yy}`;
    document.querySelector('.date').innerText = day;