/*                             Author: Daniel Janitor                               */
/*                             Year: 2021 - June                                    */ 
/*                             Application: EMPLOYEE MANAGEMENT APPLICATION         */
/*                             TRAINING JAVASCRIPT                                   */

//Class new Training
class Trainig {
    constructor(name, category, description, costs) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.costs = costs;
    }
};

//Class TR Handler
class Tr {

    static newTrPop() {
        document.querySelector('.popUPTraining').classList.add('activeTraining');
    }

    static trainingInputs() {
        const trainingName = document.querySelector('.training-name');
        const trainigDescription = document.querySelector('.training-description');
        const trainigCosts = document.querySelector('.training-costs');
        const trainingCategory = document.querySelector('.training-category-drop');


        let trainingNameV = trainingName.value;
        let trainigDescriptionV = trainigDescription.value;
        let trainigCostsV = trainigCosts.value;
        let trainingCategoryV = trainingCategory.value;

        if (trainingNameV === '' || trainigDescriptionV === '' || trainigCostsV === '' || trainingCategoryV === '') {
            const lablesTraining = document.querySelectorAll('.label-training');
            Tr.warrAlert(lablesTraining)
        } else {

            //Initialize Training
            let training = new Trainig(trainingNameV, trainingCategoryV, trainigDescriptionV, trainigCostsV);
            //Storage Training to Local Storage
            StoreTraining.addTraining(training);
            //Display Training in List UI
            Tr.addTraining(training);

            //Reset Inputs
            Tr.reset();

            Tr.getfilterValues();
        }

    }

    static warrAlert(lablesTraining) {
        lablesTraining.forEach(label =>{
            label.style.color = 'red';
        })

        setTimeout(function () {
            lablesTraining.forEach(label =>{
                label.style.color = 'black';
            })}, 2000);
        
    }

    static reset() {
        document.querySelector('.training-name').value = '';
        document.querySelector('.training-description').value = '';
        document.querySelector('.training-costs').value = '';
        document.querySelector('.training-category-drop').value = '';
        document.querySelector('.popUPTraining').classList.remove('activeTraining');
    };

    static displayTraining() {
        const trainingsFromStorage = StoreTraining.getTraining();
        trainingsFromStorage.forEach(training => Tr.addTraining(training));
    };

    static addTraining(training) {
        const trainingList = document.querySelector('.all-training-list');
        const trainingRow = document.createElement('tr');
        trainingRow.classList.add(`${training.category}`);
        trainingRow.classList.add('cats');

        trainingRow.innerHTML = `<td class="search-requirment">${training.name}</td>
        <td class="${training.category}">${training.category}</td>
        <td>${training.description}</td>
        <td>${training.costs}</td>
        <td><button class="btn btn-success"><i class="fas fa-book book"></i></button></td>
        <td><button class="btn btn-danger del"><i class="del far fa-trash-alt "></i></button></td>`;
        trainingList.appendChild(trainingRow);
    };

    static removeTraining(el) {
        if (el.classList.contains('del')) {
            el.parentElement.parentElement.parentElement.remove();
        }
    };
    static searchInputTraining(e) {
        const trainingSearch = document.querySelectorAll('.all-training-list tr');
        const q = e.target.value;

        trainingSearch.forEach(item => {
            console.log(item.textContent);
            item.querySelector('.search-requirment').textContent.toLowerCase().startsWith(q)
                ? item.style.display = ''
                : item.style.display = 'none';
        })
    };

    static trainingNumber() {
        let trStatistic = StoreTraining.getTraining();
        let trNumber = trStatistic.length;
        document.querySelector('.totalTrainings').innerHTML = trNumber;
    };
};

// Trainings Local Storage
class StoreTraining {
    static getTraining() {
        let trainings;
        if (localStorage.getItem('trainings') === null) {
            trainings = [];
        }
        else {
            trainings = JSON.parse(localStorage.getItem('trainings'))
        }
        return trainings;
    };

    static addTraining(newTraining) {
        const trainingsArray = StoreTraining.getTraining();
        trainingsArray.push(newTraining)
        localStorage.setItem('trainings', JSON.stringify(trainingsArray));
        Tr.trainingNumber();
    }

    static removeTraining(name) {
        let trainingsArray = StoreTraining.getTraining();
        trainingsArray.forEach((training, index) => {
            if (training.name === name) {
                trainingsArray.splice(index, 1)
            }
        });
        localStorage.setItem('trainings', JSON.stringify(trainingsArray))
        Tr.trainingNumber();
    };
}
/* EVENTS */
//Training Listeners
document.querySelector('.btn-create-training').addEventListener('click', Tr.newTrPop)
document.querySelector('.popUPTraining-close').addEventListener('click', () => {
    document.querySelector('.popUPTraining').classList.remove('activeTraining');
})
document.querySelector('.popUPTraining-cancel').addEventListener('click', () => {
    document.querySelector('.popUPTraining').classList.remove('activeTraining');
})
document.querySelector('.popUPTraining-save').addEventListener('click', Tr.trainingInputs);
document.addEventListener('DOMContentLoaded', Tr.displayTraining);
document.addEventListener('DOMContentLoaded', Tr.trainingNumber);

document.querySelector('.all-training-list').addEventListener('click', (e) => {
    //remove from UI list
    Tr.removeTraining(e.target)
    //remove from Storage
    StoreTraining.removeTraining(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
})

document.querySelector('.search-trainings').addEventListener('keyup', (e) => { Tr.searchInputTraining(e) })

/* CATEGORIES */
//Class new Category
class Category {
    constructor(category) {
        this.category = category;
    }
}

//Class CT Handler
class Ct {
    static newCTPop() {
        document.querySelector('.popUPCategory').classList.add('activeCategory');
    };

    static newCTInput() {
        //Inputs
        const newCategoryInput = document.querySelector('.new-category-name');
        let newCategory = newCategoryInput.value;

        if (newCategory === '') {
            const label = document.querySelector('.labelcategory');
            Ct.warrAlert(label);
        }
        else {
            //Initialize
            let category = new Category(newCategory);

            //Storage in LocalStorage
            StoreCategory.addCategory(category)

            //Add Category to list
            Ct.addCategoryToList(category)

            //Reset
            Ct.reset(newCategoryInput);
        }
    };

    static displayCategoryList() {
        const categoriesFromStorage = StoreCategory.getCategories();
        categoriesFromStorage.forEach(category => Ct.addCategoryToList(category));
    }

    static addCategoryToList(category) {
        document.querySelector('.training-drop-filter').innerHTML += `<option value="${category.category}">${category.category}</option>`;
        document.querySelector('.training-category-drop').innerHTML += `<option value="${category.category}" id="${category.category}">${category.category}</option>`;
    }

    static getfilterValues() {
        const catfilter = document.querySelector('.training-drop-filter');
        const itemsTrainings = document.querySelectorAll('.cats');

        catfilter.addEventListener('change', (e) => {
            let item = e.target.value;

            itemsTrainings.forEach(itemT => {
                itemT.style.display = 'none'
                if (itemT.classList.contains(item) || item === 'all') {
                    itemT.style.display = 'table-row'
                }
                else {
                    itemT.style.display = 'none';
                }
            })
        })
    };
    static categoryNumber() {
        let ctStatistic = StoreCategory.getCategories();
        let crNumber = ctStatistic.length;
        document.querySelector('.totalCategories').innerHTML = crNumber;
    };

    static reset(newCategoryInput) {
        newCategoryInput.value = '';
        document.querySelector('.popUPCategory').classList.remove('activeCategory');
    }

    static warrAlert(label) {

        //separate function with delay
        document.querySelector('.new-category-name').placeholder = 'Enter Name'
        label.style.color = 'red'
        label.innerHTML += ' Name Is Required *';

        setTimeout(function () {
            document.querySelector('.new-category-name').placeholder = 'Name';
            label.style.color = 'black';
            label.innerHTML = 'New Category';
        }, 2000);

    }
};

/// Category Local Storage
class StoreCategory {

    static getCategories() {
        let categoriesArray;
        if (localStorage.getItem('categories') === null) {
            categoriesArray = [];
        }
        else {
            categoriesArray = JSON.parse(localStorage.getItem('categories'));
        }
        return categoriesArray;
    };

    static addCategory(newCategory) {
        let categoriesArray = StoreCategory.getCategories();
        categoriesArray.push(newCategory);
        localStorage.setItem('categories', JSON.stringify(categoriesArray));
        Ct.categoryNumber();
    };
};

/*Events*/
//Category Listeners
document.querySelector('.btn-create-category').addEventListener('click', Ct.newCTPop);
document.querySelector('.popUPCategory-close').addEventListener('click', () => {
    Ct.reset(document.querySelector('.new-category-name'));
    document.querySelector('.popUPCategory').classList.remove('activeCategory');
})
document.querySelector('.popUPCategory-cancel').addEventListener('click', () => {
    Ct.reset(document.querySelector('.new-category-name'));
    document.querySelector('.popUPCategory').classList.remove('activeCategory');
})
document.querySelector('.popUPCategory-save').addEventListener('click', Ct.newCTInput);
document.addEventListener('DOMContentLoaded', Ct.displayCategoryList);
document.addEventListener('DOMContentLoaded', Ct.getfilterValues);
document.addEventListener('DOMContentLoaded', Ct.categoryNumber);





























