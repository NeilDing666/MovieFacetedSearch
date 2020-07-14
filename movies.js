/*
 * Copyright (c) 2019. This source code is programmed by Zhengyu Ding Student ID: 6033660.
 * Only for communicating and testing purpose of the subject MTS 9207/ ISIT 207 lab exercises.
 * Please delete this file in 24 hours after download.
 * All rights reserved.
 */

class movie {
    constructor (Name,Year,Ranking,Duration,Classification,Score,Country,Language) {
        this.Name = Name;
        this.Year = Year;
        this.Ranking = Ranking;
        this.Duration = Duration;
        this.Classification = Classification;
        this.Score = Score;
        this.Country = Country;
        this.Language = Language;
    }
}
// class movie {
//     constructor (Name,Ranking,Classification,Country,Score) {
//         this.Name = Name;
//         //this.Year = Year;
//         this.Ranking = Ranking;
//         //this.Duration = Duration;
//         this.Classification = Classification;
//         this.Country = Country;
//         this.Score = Score;
//         //this.Language = Language;
//     }
// }

//let filepath = 'movie.txt';
let filepath = 'movies.csv';
let dataCollection = [];
let AttributeList = [];
let FullAttributeList = [];

showPage();

function loadFile(text){
    return text.split('\n')
        .map(row => new movie (...row.split(",")));
}

function showPage(){
    fetch(filepath)
        .then(response => response.text())
        .then(text => {
            //load file into array data
            let data = loadFile(text);
            //read table heading
            let tableHeading = data[0];
            for (let i = 1; i < data.length; i++){
                dataCollection.push(data[i]);
            }
            //dataCollection = data.splice(0,1);
            for (let i in tableHeading){
                AttributeList.push(i);
                FullAttributeList.push(i);
            }
            //console.log(FullAttributeList)
            let tr = document.createElement("tr");
            tr.id = "0";
            let tdi = document.createElement("th");
            tdi.innerText = "Index";
            tr.appendChild(tdi);
            for (let i in tableHeading){
                let th = document.createElement("th");
                th.innerText = tableHeading[i];
                tr.appendChild(th);
            }
            document.getElementById("resultTable").appendChild(tr);
            data.splice(0,1);
            //output data into table row
            AttributeList.splice(0,1);
            AttributeList.splice(3,1);
            //console.log(AttributeList)
            showTable(data);
            //console.log(dataCollection)
            addFieldset(dataCollection,AttributeList);
            //output category into filter section
            // AttributeList.splice(0,1);
            // AttributeList.splice(3,1);
            // //let a1 = AttributeList.splice(1,3);
            // addFieldset(showTable(data),AttributeList);
            // let c1 = document.getElementById("categorical1");
            // c1.innerText = AttributeList[2];
            // let fieldset1 = document.getElementById("fieldset1");
            // for (let i in getAttributeValue(dataCollection,AttributeList[2])){
            //     if (i !== ""){
            //         // //let input1 = document.createElement("input");
            //         // input1.type = "checkbox";
            //         // input1.className = "checkbox";
            //         // input1.id = "checkbox" + i;
            //         // input1.value = i;
            //         // console.log(i);
            //         // input1.innerText = i;
            //         // let label = document.createElement("label");
            //         // label.innerText = i;
            //         // let line = document.createElement("br")
            //         // fieldset1.appendChild(input1);
            //         // fieldset1.appendChild(label);
            //         // fieldset1.appendChild(line);
            //     }
            // }
            //
            // let c2 = document.getElementById("categorical2");
            // c2.innerText = AttributeList[4];
            // let c3 = document.getElementById("categorical3");
            // c3.innerText = AttributeList[6];


        });
}

function showTable(data) {
    for (let i = 0; i < data.length; i++){
        let tr = document.createElement("tr");
        tr.id = (i + 1).toString();
        let tdi = document.createElement("td");
        tdi.innerText = (i + 1).toString();
        tr.appendChild(tdi);
        for (let x in data[i]){
            let td = document.createElement("td");
            td.innerText = data[i][x].toString();
            tr.appendChild(td);
        }
        document.getElementById("resultTable").appendChild(tr);
        //dataCollection.push(data[i]);
    }
    //return dataCollection;
}

function addFieldset(Array, attList) {
    attList.forEach(x => {
        let div = document.getElementById("SearchConditions");
        let fieldset = document.createElement("fieldset");
        let legend = document.createElement("legend");
        legend.innerText = x;
        fieldset.appendChild(legend);
        fieldset.id = x;
        fieldset.className = "fieldset";
        //fieldset.validationMessage="???";
        let attVal = getAttributeValue(Array,x);
        for (let i in attVal){
            if (i !== ""){
                let input = document.createElement("input");
                input.type = "checkbox";
                input.className = "checkbox";
                input.id = "checkbox_" + i;
                input.value = i;
                input.name = "checkbox_"+ x;
                //console.log(i);
                let label = document.createElement("label");
                label.setAttribute("for","checkbox_" + i);
                let ValueNumber = document.createElement("label");
                ValueNumber.innerText = " (" + attVal[i] + ") ";
                label.innerText = i;
                let line = document.createElement("br")
                fieldset.appendChild(input);
                fieldset.appendChild(label);
                fieldset.appendChild(ValueNumber);
                fieldset.appendChild(line);
            }
        }
        div.appendChild(fieldset);
    });

}

function getAttributeValue(Array, AttributeName) {
    let list = [];
    let dataset = {};
    for (let i in Array){
        list.push(Array[i][AttributeName]);
    }
    list.forEach(x => dataset[x] = 0);
    list.forEach(x => dataset[x]++);
    //console.log(search(dataCollection,"Classification", vl));
    return dataset;
}

function search(itemArray, attributeName, valueList){
    let list = [];
    let resultList = [];
    //if valueList is empty then search all
    itemArray.forEach(x => list.push(x[attributeName]));
    if (valueList === undefined || valueList.length === 0){
        resultList = itemArray;
    }else {
        valueList.forEach(x => {
            for (let i = 0; i < list.length; i++){
                if (x === list[i]){
                    resultList.push(itemArray[i]);
                }
            }
        });
    }
    return resultList;
}

function validNum(data,score) {
    let res = [];
    let num1 = document.getElementById("lowerScore").value;
    if (num1 === ""){
        num1 = 0;
    }
    let num2 = document.getElementById("upperScore").value;
    if (num2 === ""){
        num2 = 10;
    }
    if (num1 < 0 || num1 > 10 || num2 < 0 || num2 > 10 || num1 > num2){
        alert("Please input a valid number!");
    }else {
        for (let i = 0; i < data.length; i++){
            if (num1 <= Number(data[i][score]) && Number(data[i][score]) <= num2){
                res.push(data[i]);
            }
        }
    }
    //console.log(res);
    return res;
}

function getCurrentTable() {
    let rows = document.getElementsByTagName("tr");
    let selectedrows = [];
    for (let i = 1; i < rows.length; i++){
        let item = '';
        for (let j = 1; j <= FullAttributeList.length; j++){
            if(j !== 1){
                item = item  + ',' + rows[i].cells[j].textContent.toString();
            }else {
                item = item + rows[i].cells[j].textContent.toString();
            }
        }
        let field = item.split(',');
        //console.log(field);
        selectedrows.push(new movie(...field));

    }
    //console.log(selectedrows);
    return selectedrows;
}

function filter() {
    let selectedVal = [];
    let res = getCurrentTable();
    res = validNum(res, "Score");
    let num1 = document.getElementById("lowerScore").value;
    let num2 = document.getElementById("upperScore").value;
    selectedVal.push(num1);
    selectedVal.push(num2);
    for (let i = 0; i < AttributeList.length; i++){
        let valList = [];
        let category = document.getElementsByName("checkbox_" + AttributeList[i]);
        for (let i = 0; i < category.length; i++){
            if (category[i].checked){
                valList.push(category[i].value);
                selectedVal.push(category[i].value);
            }
        }
        res = search(res, AttributeList[i], valList);
    }
    // if (res.length === 0){
    //     //reset();
    //     selectedVal = [];
    //     alert("No such thing! Please click the Reset button!");
    // }else {
    //     document.getElementById("SearchConditions").innerText = "";
    //     addFieldset(res,AttributeList);
    //     //console.log(res);
    //     let trs = document.getElementsByTagName("tr");
    //     for (let i = trs.length - 1; i > 0; i--){
    //         document.getElementById("resultTable").removeChild(trs[i]);
    //     }
    //     //document.getElementById("resultTable").innerText = "";
    //     showTable(res);
    //
    //
    // //f();
    // //console.log(trs);
    //
    //
    // }
    if(displayResults(res) && typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        //console.log("You have retrieved " + localStorage.clickcount + " times");
        //console.log("res"+localStorage.length);
        console.log(selectedVal);
        localStorage[localStorage.clickcount] = selectedVal;
        //console.log(localStorage[localStorage.clickcount]);
        //console.log(localStorage.length);
    }
    return res;
}

function reset() {
    document.getElementById("SearchConditions").innerText = "";
    document.getElementById("lowerScore").value = "";
    document.getElementById("upperScore").value = "";
    addFieldset(dataCollection,AttributeList);
    //showPage()
    let trs = document.getElementsByTagName("tr");
    for (let i = trs.length - 1; i > 0; i--){
        document.getElementById("resultTable").removeChild(trs[i]);
    }
    showTable(dataCollection);
}

function showHistory() {
    document.getElementById("HistoryList").innerText = "";
    let divHistory = document.getElementById("HistoryList");
    for (let i = 1; i < localStorage.length; i++){
        let label = document.createElement("label");
        let rb = document.createElement("input");
        rb.type = "radio";
        rb.id = i.toString();
        rb.value = localStorage[i];
        rb.name = "radiobutton";
        label.innerText = localStorage[i];
        label.setAttribute("for",i.toString());
        //label.setAttribute("onclick",submitHistory(rb.Number(id)));
        let line = document.createElement("br")
        divHistory.appendChild(rb);
        divHistory.appendChild(label);
        divHistory.appendChild(line);
    }
}
function clearHistory() {
    localStorage.clear();
    document.getElementById("HistoryList").innerText = "";
}
function submitHistory() {
    let rbs = document.getElementsByName("radiobutton");
    let HistoryNumber = 0;
    for (let i = 0; i < rbs.length; i++){
        if (rbs[i].checked){
            HistoryNumber = document.getElementById(rbs[i].id).id;
            break;
        }
    }
    console.log(localStorage[HistoryNumber]);
    document.getElementById("SearchConditions").innerText = "";
    addFieldset(dataCollection,AttributeList);
    let trs = document.getElementsByTagName("tr");
    for (let i = trs.length - 1; i > 0; i--){
        document.getElementById("resultTable").removeChild(trs[i]);
    }
    showTable(dataCollection);
    if (localStorage[HistoryNumber] === undefined){
        alert("You haven't choose a search history!");
    }else {
        let cbs = document.getElementsByClassName("checkbox");
        let searchText = localStorage[HistoryNumber].split(",");
        //console.log(searchText);
        document.getElementById("lowerScore").value = searchText[0];
        document.getElementById("upperScore").value = searchText[1];
        for (let i = 2; i < searchText.length; i++){
            //console.log(localStorage[HistoryNumber][i]);
            for (let t = 0; t < cbs.length; t++){
                if (searchText[i] === cbs[t].value){
                    cbs[t].checked = true;
                }
            }
        }
        //filter();
    }
}
function freeText() {
    let text = document.getElementById("inputFreeText").value.split(",");
    let res = dataCollection;
    // console.log(text);
    // text.forEach(x => {
    //     console.log(x);
    //     AttributeList.forEach(y => {
    //         console.log(y);
    //         let valList = [];
    //         for (let z in getAttributeValue(dataCollection,y)){
    //             if (x === z){
    //                 valList.push(x);
    //             }
    //             console.log(valList);
    //         }
    //         console.log(valList);
    //         res = search(res,"Classification",valList);
    //         console.log(valList);
    //     });
    // });
    AttributeList.forEach(x => {
        let valL = [];
        for (let y in getAttributeValue(dataCollection,x)){
            text.forEach(z => {
                if (z === y){
                    valL.push(z);
                }
            });
        }
        res = search(res, x,valL);
    });
    displayResults(res);
}
function displayResults(res) {
    if (res.length === 0){
        alert("No such thing!");
        return false;
    }else {
        document.getElementById("SearchConditions").innerText = "";
        addFieldset(res,AttributeList);
        //console.log(res);
        let trs = document.getElementsByTagName("tr");
        for (let i = trs.length - 1; i > 0; i--){
            document.getElementById("resultTable").removeChild(trs[i]);
        }
        showTable(res);
        return true;
    }
}