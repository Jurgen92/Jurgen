var adminMode, data, brand, type, fuel, engine, power, year, color, image, price, status, date, htmlStr, i, symbols, carid, dbid, aantalcars, Ddbid, Dprice, thisBrand, statistics;
adminMode = false;
statistics = false;


/*Deze functie checkt of de meegegeven parameter een even of oneven getal is*/
function isEven(value) {
    "use strict";
    if (value % 2 === 0) {
        return true;
    }
    if (value % 2 !== 0) {
        return false;
    }
}

/*Opmaak tabellen. Bepaald op basis van de positie tijdens de loop of het een even of oneven class mee moet krijgen*/
function tdAlternately(i) {
    "use strict";
    if (isEven(i) === true) {
        htmlStr += "<td class='tableTdEven'>";
    } else {
        htmlStr += "<td class='tableTdOdd'>";
    }
}

/*Deze functie maakt het menu met de buttons aan, contact, over ons etc.*/
function createMenu() {
    "use strict";
    var content, menudiv, contactbtn, overonsbtn;
    content = document.getElementById("content");
    menudiv = document.createElement('div');
    menudiv.id = "menuDiv";
    content.appendChild(menudiv);
    contactbtn = document.createElement('img');
    contactbtn.src = "images/contactbtn.png";
    contactbtn.className = "menuButtons";
    menudiv.appendChild(contactbtn);
    overonsbtn = document.createElement('img');
    overonsbtn.src = "images/overonsbtn.png";
    overonsbtn.className = "menuButtons";
    menudiv.appendChild(overonsbtn);
}

/*Deze functie is bedoeld om een nieuwe auto toe te voegen. Het genereert een tabel met lege waarden die kan worden ingevuld. Wanneer
* er op de knop "Toevoegen" wordt geklikt wordt de functie "newValues()" aangeroepen en worden de ingevulde gegevens in de database opgeslagen*/
function newCar() {
    "use strict";
    var reservationinfo, carinfo, htmlStr1, divdetail, divdetails, toevoegen, close;
    if (!document.getElementById("detailDiv")) {
        carinfo = document.getElementById('carInfo');
        carinfo.parentNode.removeChild(carinfo);

        divdetail = document.createElement("div");
        divdetail.id = "detailDiv";
        document.getElementById("content").appendChild(divdetail);
    }
    //Set the hash fragment
    //location.hash = "newCar";

    htmlStr1 = "<table id='carDetails'>";
    htmlStr1 += "<tr>";
    htmlStr1 += "<td>Merk</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updateBrand" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "<tr>";
    htmlStr1 +=    "<td>Type</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updateType" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "<tr>";
    htmlStr1 +=   "<td>Brandstof</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updateFuel" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "<tr>";
    htmlStr1 +=   "<td>Motorinhoud</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updateEngine" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "<tr>";
    htmlStr1 +=   "<td>Aantal PK</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updatePower" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "<tr>";
    htmlStr1 += "<td>Bouwjaar</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updateYear" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "<tr>";
    htmlStr1 +=   "<td>Kleur</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updateColor" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "<tr>";
    htmlStr1 += "<td>Prijs</td>";
    htmlStr1 += "<td>";
    htmlStr1 += '<input type="text" id="updatePrice" value=""/></input>';
    htmlStr1 += "</td>";
    htmlStr1 += "</tr>";
    htmlStr1 += "</table>";
    htmlStr1 += '<input type="text" id="updateImage" value="auto"/></input>';
    //htmlStr1 += "<img "+"src=" + "images/autos/"+image+ " id='detailImage' " +">";
    htmlStr1 += "</img>";
    $("#detailDiv").html(htmlStr1);

    toevoegen = document.createElement('input');
    toevoegen.type = "submit";
    toevoegen.value = "Toevoegen";
    toevoegen.id = "toevoegen";
    document.getElementById('detailDiv').appendChild(toevoegen);
    toevoegen.addEventListener("click", newValues, false);

    close = document.createElement('input');
    close.type = "submit";
    close.value = "Sluiten";
    close.id = "close";
    close.className = "carButtons";
    document.getElementById('detailDiv').appendChild(close);
    close.addEventListener("click", function () {
        //var detailDiv = document.getElementById('detailDiv');
        //getCars.getDocs();
        //detailDiv.parentNode.removeChild(detailDiv);
       // detailDiv.style.visibility = 'hidden';
       // var carinfo = document.getElementById("carInfo");
        //carinfo.style.visibility = 'visible';
        goBack();
    }, false);
}

/*Deze functie wordt direct gestart wanneer de pagina wordt geladen. Het zorgt ervoor dat de auto's worden opgehaald uit de database
* en dat deze in tabelvorm worden weergegeven.*/
(function () {
    "use strict";
    function createTableHeaders() {

    }
    var getCars = {
        // RETRIEVE
        getDocs: function () {
            $.ajax({
                    url: "/cars/",
                    type: "get",
                    dataType: "json",
                    success: function (retObj) {

                        data = retObj.doc;
                        aantalcars = data.length;

                        htmlStr = "<table id='sorttable' class='filter'>";
                        createTableHeaders();

                        for (i = 0; i < data.length; i += 1) {
                            symbols = data[i];
                            dbid = data[i]._id;
                            carid = data[i].id;
                            brand = data[i].make;
                            type = data[i].style;
                            fuel = data[i].fuel;
                            engine = data[i].engine;
                            power = data[i].power;
                            year = data[i].year;
                            color = data[i].color;
                            image = data[i].imageUrl;
                            price = data[i].price;
                            status = data[i].status;

                            if (adminMode===false && status != "Verkocht") {
                                htmlStr += "<tr>";
                                tdAlternately(i);
                                htmlStr += brand;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += type;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += price;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += "<img " + "src=" + "images/autos/" + image + " width='70px'" + ">";
                                htmlStr += "</img>";
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += status;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += '<input type="submit" class="carButtons" value="Meer..." onclick="getDetails(\'' + dbid + '\')"/></input>';
                                htmlStr += "</td>";
                                htmlStr += "</tr>";
                            }
                            if(adminMode === true) {
                                htmlStr += "<tr>";
                                tdAlternately(i);
                                htmlStr += brand;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += type;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += price;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += "<img " + "src=" + "images/autos/" + image + " width='70px'" + ">";
                                htmlStr += "</img>";
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += status;
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += '<input type="submit" class="carButtons" value="Meer..." onclick="getDetails(\'' + dbid + '\')"/></input>';
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += '<input type="submit" class="carButtons" value="Verwijder" onclick="deleteCar(\'' + dbid + '\')"/></input>';
                                htmlStr += "</td>";
                                tdAlternately(i);
                                htmlStr += '<input type="submit" class="carButtons" value="Updaten" onclick="updateCar(\'' + dbid + '\')"/></input>';
                                htmlStr += "</td>";
                                htmlStr += "</tr>";

                            }



                        }
                        htmlStr += "</table>";
                        var carinfo = document.createElement('div');
                        carinfo.id = "carInfo";
                        document.getElementById("content").appendChild(carinfo);
                        $("#carInfo").html(htmlStr);
                        new FilterTable({filterClass: 'filter'});
                    }
                }
            );
        }
    };
    window.getCars = getCars;
}());


/*Alle biedingen op de destbetreffende auto worden opgehaald uit de database en weergegeven in tabelvorm.*/
function showBids(Ddbid) {
    "use strict";
    var biddiv, biddata, htmlStrBt, bid, product, person, i, bids;

    biddiv = document.createElement('div');
    biddiv.id = "bidDiv";
    document.getElementById("reservationDiv").appendChild(biddiv);

    console.log(Ddbid);
    $.ajax({
        url: "/transactions/",
        type: "get",
        dataType: "json",
        success: function (retObj) {
            biddata = retObj.doc;

            htmlStrBt = "<table id='bidTable'>";
            for (i = 0; i < biddata.length; i += 1) {
                bid = retObj.doc[i].bid;
                product = retObj.doc[i].productId;

                if (product === Ddbid) {

                    htmlStrBt += "<tr>";
                    htmlStrBt += "<td>";
                    htmlStrBt += "Naam";
                    htmlStrBt += "</td>";
                    htmlStrBt += "<td>";
                    htmlStrBt += bid;
                    htmlStrBt += "</td>";
                    htmlStrBt += "</tr>";
                }
            }
            htmlStrBt += "</table>";

            $("#bidDiv").html(htmlStrBt);
        }
    });
}

/*Met deze functie is het mogelijk om snel een simpel inputveld aan te maken. De "id" die wordt meegegeven als parameter dient ervoor
* om het juiste element te selecteren, de text parameter is de standaard waarde die een inputveld krijgt. */
function inputField(id, text) {
    "use strict";
    var elementId = document.getElementById(id);
    elementId.style.color = "grey";
    elementId.addEventListener("click", function () {
        if (elementId.value === text) {
            elementId.value = "";
            elementId.style.color = "black";
        }
    }, false);

    elementId.addEventListener("blur", function () {
        if (elementId.value === "") {
            elementId.value = text;
            elementId.style.color = "grey";
        }
    }, false);
}

/*Wanneer er op de button "Meer.." wordt gedrukt worden alle gegevens van de destbetreffence auto opgehaald en weergegeven in tabelvorm*/
function getDetails(dbid) {
    "use strict";
    var htmlStr1, divdetail, divdetails, Dcarid, Dbrand, Dtype, Dfuel, Dengine, Dpower, Dyear, Dcolor, Dimage, Dstatus, htmlStrB, h3resTitle, resTitle, close, carinfo;

    if (!document.getElementById("detailDiv")) {
        //23-04 toegevoegd
        carinfo= document.getElementById("carInfo");
        carinfo.parentNode.removeChild(carinfo);
        //

        divdetail = document.createElement("div");
        divdetail.id = "detailDiv";
        document.getElementById("content").appendChild(divdetail);


    } else {
        divdetails = document.getElementById("detailDiv");
        divdetails.style.visibility = 'visible';
    }

    $.ajax({
        url: "/cars/" + dbid,
        type: "get",
        dataType: "json",
        success: function (retObj) {
            data = retObj.doc;
            console.log(data);

            Ddbid = data._id;
            Dcarid = data.id;
            Dbrand = data.make;
            Dtype = data.style;
            Dfuel = data.fuel;
            Dengine = data.engine;
            Dpower = data.power;
            Dyear = data.year;
            Dcolor = data.color;
            Dimage = data.imageUrl;
            Dprice = data.price;
            Dstatus = data.status;

            htmlStr1 = "<table id='carDetails'>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>";
            htmlStr1 += "<strong>";
            htmlStr1 += Dstatus;
            htmlStr1 += "</strong>";
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>Merk</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dbrand;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=    "<td>Type</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dtype;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Brandstof</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dfuel;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Motorinhoud</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dengine;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Aantal PK</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dpower;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>Bouwjaar</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dyear;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Kleur</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dcolor;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>Prijs</td>";
            htmlStr1 += "<td>";
            htmlStr1 += Dprice;
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "</table>";

           // htmlStr1 += "<img " + "src=" + "images/autos/" + Dimage + " id='detailImage' " + ">";
           // htmlStr1 += "</img>";

            $("#detailDiv").html(htmlStr1);

            //location.hash = Dbrand + Dtype;

            var imagediv = document.createElement('div');
            imagediv.id = "imageDiv";
            document.getElementById("detailDiv").appendChild(imagediv);
            var makeImage = document.createElement('img');
            makeImage.src = "images/autos/" + Dimage;
            makeImage.id = "detailImage";
            document.getElementById("imageDiv").appendChild(makeImage);

         //   var image = document.getElementById('detailImage');
           // document.getElementById("detailDiv").appendChild(makeImage);

            var reservationdiv = document.createElement('div');
            reservationdiv.id = "reservationDiv";
            document.getElementById("detailDiv").appendChild(reservationdiv);

            htmlStrB =  "<form id='bidform'>";
            htmlStrB += "<tr>";
            htmlStrB += "<td>";
            htmlStrB += '<input type="text" name="phone" value="uw telefoonnummer" id="phone">';
            htmlStrB += "</td>";
            htmlStrB += "<td>";
            htmlStrB += '<input type="text" name="bid" value="uw bod" id="bid">';
            htmlStrB += "</td>";
            htmlStrB += "<td>";
            htmlStrB += '<input type="button" value = "Bieden" onclick="checkBid()">';
            htmlStrB += "</td>";
            htmlStrB += "</tr>";
            htmlStrB += "</form>";

            $("#reservationDiv").html(htmlStrB);
            inputField("phone", "uw telefoonnummer");
            inputField("bid", "uw bod");

            //Alle biedingen op de auto worden weergegeven
            showBids(Ddbid);

            h3resTitle = document.createElement('h5');
            document.getElementById('reservationDiv').appendChild(h3resTitle);
            resTitle = document.createTextNode("Om te reserveren moet het bod minimaal " + 0.8 * Dprice + " bedragen.");
            h3resTitle.appendChild(resTitle);

            //
            // htmlStr1 += '<input type="submit" class="carButtons" value="Go back" onclick="goBack()"/></input>';
            //
            close = document.createElement('input');
            close.type = "submit";
            close.value = "Sluiten";
            close.className = "carButtons";
            close.addEventListener("click", function () {
                goBack();
            }, false);
            document.getElementById('reservationDiv').appendChild(close);

        /*
            close = document.createElement('input');
            close.type = "submit";
            close.value = "Sluiten";
            close.id = "close";
            document.getElementById('reservationDiv').appendChild(close);
            close.addEventListener("click", function () {
                var detailDiv = document.getElementById('detailDiv');
                // detailDiv.style.visibility='hidden';
                detailDiv.parentNode.removeChild(detailDiv);
                carinfo = document.getElementById("carInfo");
                carinfo.style.visibility = 'visible';

            }, false);
            */
        }
    });
}

/*Deze functie wordt aangeroepen wanneer het bod wordt geaccepteerd tijdens de functie "checkBid()". Het slaat het ingevulde bod en het
* bijbehorende telfoonnummer op in de database. Daarbij wordt ook de juiste verwijzing opgeslagen naar het product(productId)*/
function saveBid(inputBid, inputPhone) {
    //update
    $.ajax({
        type: "POST",
        url: "/transaction/",
        //  type:"PUT",
        processData: true,
        dataType: 'json',
        data:
            {
                "productId" : Ddbid,
                "phonenumber": inputPhone,
                "bid": inputBid
            }
    });
}

/*Wanneer er binnen het "car detailscherm" op de knop "Bieden" wordt geklikt worden de waarden uit de inputvelden gecontroleerd met
* deze functie. Het controleerd of het ingevulde bod niet lager is dan 80% van de vraagprijs en of het ingevulde bedrag een nummer is.
* Daarna worden alle biedingen opgehaald uit de database en wordt er gekeken of het ingevulde telefoonnummer al voorkomt in de database,
* omdat een persoon maar maximaal 2 keer mag reserveren. Wanneer het telefoonnummer al 2 keer voorkomt verschijnt er een melding dat
* de klant maar maximaal 2 keer mag reserveren. Wanneer het telfoon nummer nog geen 2 keer voorkomt en het bod groter of gelijk is aan
* 80% van de vraagprijs wordt het bod en het telefoonnummer opgeslagen door de functie "saveBids()" aan te roepen*/
function checkBid() {
    "use strict";
    var telefoonnummer, telefoonnummers, i, inputName, inputPhone, inputBid;
    telefoonnummers = 0;

   // inputName = document.forms["bidform"]["name"].value;
    inputPhone = document.forms.bidform.phone.value;
    inputBid = document.forms.bidform.bid.value;

    if (inputBid < 0.8 * Dprice) {
        alert("Het bod moet minimaal " + 0.8 * Dprice + " bedragen.");
    }

    if (isNaN(inputBid)) {
        alert("Het ingevoerde bedrag is niet geldig");
    }

    $.ajax({
        url: "/transactions/",
        type: "get",
        dataType: "json",
        success: function (retObj) {
            data = retObj.doc;

            for (i = 0; i < data.length; i += 1) {
                telefoonnummer = retObj.doc[i].phonenumber;
                console.log(telefoonnummer);
                console.log(inputPhone);

                if (telefoonnummer === inputPhone) {
                    telefoonnummers = telefoonnummers + 1;
                }
            }
            if (telefoonnummers === 2) {
                alert("U mag maar maximaal 2 keer reserveren");
            }

            if (telefoonnummers < 2 && inputBid >= 0.8 * Dprice) {
                var bidaccepted = document.createTextNode("Bod geplaatst!");
                document.getElementById('detailDiv').appendChild(bidaccepted);
                setTimeout(function () {
                    bidaccepted.parentNode.removeChild(bidaccepted);
                }, 2000);
                saveBid(inputBid, inputPhone);
                showBids(Ddbid);
            }
        }
    });
}

/*Deze functie wordt aangeroepen wanneer de gewijzigde gegevens opgeslagen moeten worden in de database. Het haalt de gegevens op uit
*de inputvelden die zijn ingevuld tijdens het updaten*/
function updateValues() {
    "use strict";
    var x, y, statusvalue, brandvalue, typevalue, fuelvalue, enginevalue, powervalue, yearvalue, colorvalue, pricevalue, updateText;
    x = document.getElementById("selectStatus").selectedIndex;
    y = document.getElementById("selectStatus").options;
    statusvalue = y[x].text;
    // var statusvalue = document.getElementById('updateStatus').value;
    brandvalue = document.getElementById('updateBrand').value;
    typevalue = document.getElementById('updateType').value;
    fuelvalue = document.getElementById('updateFuel').value;
    enginevalue = document.getElementById('updateEngine').value;
    powervalue = document.getElementById('updatePower').value;
    yearvalue = document.getElementById('updateYear').value;
    colorvalue = document.getElementById('updateColor').value;
    pricevalue = document.getElementById('updatePrice').value;

    $.ajax({
        url: "/car/" + Ddbid,
        type: "PUT",
        processData: true,
        data:
            {
                "id" : aantalcars,
                "make" : brandvalue,
                "style" : typevalue,
                "fuel" : fuelvalue,
                "engine" : enginevalue,
                "power" : powervalue,
                "year" : yearvalue,
                "color" : colorvalue,
                "price" : pricevalue,
                "status" : statusvalue,
                //nieuw 4-05
                "modificationDate" : Date.now
                //
            }
    });
    updateText = document.createTextNode("Update voltooid");
    document.getElementById('detailDiv').appendChild(updateText);
    setTimeout(function () {
        updateText.parentNode.removeChild(updateText);
    }, 2000);
    //getCars.getDocs();
}

/*Wanneer er op de button "Updaten" wordt geklikt wordt deze functie aangeroepen. Deze haalt de detailgegevens van de auto op en geeft
* deze weer in tabelvorm met inputvelden die bewerkt kunnen worden. Wanneer er op de knop updaten wordt geklikt wordt de functie
* "updateValues" aangeroepen. zie "updateValues"*/
function updateCar(dbid) {
    "use strict";
    var divdetail, divdetails, htmlStr1, Dcarid, Dbrand, Dtype, Dfuel, Dengine, Dpower, Dyear, Dcolor, Dimage, Dprice, Dstatus, close, detailDiv, carinfo;

    if (!document.getElementById("detailDiv")) {
        //23-04 toegevoegd
        carinfo= document.getElementById("carInfo");
        carinfo.parentNode.removeChild(carinfo);
        //

        divdetail = document.createElement("div");
        divdetail.id = "detailDiv";
        document.getElementById("content").appendChild(divdetail);
    } else {
        divdetails = document.getElementById("detailDiv");
        divdetail.style.visibility = 'visible';
    }


    $.ajax({
        url: "/cars/" + dbid,
        type: "get",
        dataType: "json",
        success: function (retObj) {
            // console.log(retObj);
            data = retObj.doc;

            Ddbid = data._id;
            Dcarid = data.id;
            Dbrand = data.make;
            Dtype = data.style;
            Dfuel = data.fuel;
            Dengine = data.engine;
            Dpower = data.power;
            Dyear = data.year;
            Dcolor = data.color;
            Dimage = data.imageUrl;
            Dprice = data.price;
            Dstatus = data.status;

            htmlStr1 = "<table id='carDetails'>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>";
            htmlStr1 += ' <select id="selectStatus">';
            htmlStr1 += "    <option>Te koop</option>";
            htmlStr1 += "    <option>Gereserveerd</option>";
            htmlStr1 += "    <option>Verkocht</option>";
            htmlStr1 += "</select>";
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>Merk</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updateBrand" value="' + Dbrand + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=    "<td>Type</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updateType" value="' + Dtype + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Brandstof</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updateFuel" value="' + Dfuel + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Motorinhoud</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updateEngine" value="' + Dengine + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Aantal PK</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updatePower" value="' + Dpower + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>Bouwjaar</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updateYear" value="' + Dyear + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 +=   "<td>Kleur</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updateColor" value="' + Dcolor + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "<tr>";
            htmlStr1 += "<td>Prijs</td>";
            htmlStr1 += "<td>";
            htmlStr1 += '<input type="text" id="updatePrice" value="' + Dprice + '"/></input>';
            htmlStr1 += "</td>";
            htmlStr1 += "</tr>";
            htmlStr1 += "</table>";
           // htmlStr1 += "<img " + "src=" + "images/autos/" + Dimage + " id='detailImage' " +">";
          //  htmlStr1 += "</img>";

            $("#detailDiv").html(htmlStr1);

          //  location.hash = "carUpdate" + Dbrand + Dtype;

            var imagediv = document.createElement('div');
            imagediv.id = "imageDiv";
            document.getElementById("detailDiv").appendChild(imagediv);
            var makeImage = document.createElement('img');
            makeImage.src = "images/autos/" + Dimage;
            makeImage.id = "detailImage";
            document.getElementById("imageDiv").appendChild(makeImage);

            var updaten = document.createElement('input');
            updaten.type = "submit";
            updaten.value = "Updaten";
            updaten.id = "updaten";
            document.getElementById('detailDiv').appendChild(updaten);
            updaten.addEventListener("click", updateValues, false);

            close = document.createElement('input');
            close.type = "submit";
            close.value = "Sluiten";
            close.id = "close";
            close.className = "carButtons";
            document.getElementById('detailDiv').appendChild(close);
            close.addEventListener("click", goBack,
            false);
        }
    });
}

/*Met deze functie kan een auto worden verwijderd door op de knop "Verwijder" te klikken*/
function deleteCar(dbid) {
    $.ajax({
        url: "/transaction/" + dbid,
        type: "DELETE",
        success: function () {

        }
    });

    $.ajax({
        url: "/car/" + dbid,
        type: "DELETE",
        success: function () {
            alert("Auto verwijderd!");
            getCars.getDocs();
        }
    });


}

/*Deze functie haalt de ingevulde waarden op uit de inputvelden en zorgt ervoor dat de nieuwe gegevens daadwerkelijk worden opgeslagen
* in de database*/
function newValues() {
    "use strict";
    var brandvalue, typevalue, fuelvalue, enginevalue, powervalue, yearvalue, colorvalue, pricevalue, imagevalue, toevoegText;
    brandvalue = document.getElementById('updateBrand').value;
    typevalue = document.getElementById('updateType').value;
    fuelvalue = document.getElementById('updateFuel').value;
    enginevalue = document.getElementById('updateEngine').value;
    powervalue = document.getElementById('updatePower').value;
    yearvalue = document.getElementById('updateYear').value;
    colorvalue = document.getElementById('updateColor').value;
    pricevalue = document.getElementById('updatePrice').value;
    imagevalue = document.getElementById('updateImage').value;
    aantalcars =   aantalcars + 1;

    $.ajax({
        url: "/car/",
        type: "POST",
        processData: true,
        data:
            {
                "id" : aantalcars,
                "make" : brandvalue,
                "style" : typevalue,
                "fuel" : fuelvalue,
                "engine" : enginevalue,
                "power" : powervalue,
                "year" : yearvalue,
                "color" : colorvalue,
                "imageUrl" : imagevalue,
                "price" : pricevalue,
                "status" : "Te koop"
            }
    });

    toevoegText = document.createTextNode("Auto toegevoegd");
    document.getElementById('detailDiv').appendChild(toevoegText);
    setTimeout(function () {
        toevoegText.parentNode.removeChild(toevoegText);
    }, 2000);
   // getCars.getDocs();
}

/*Er is gereserveerd wanneer er een bod is geplaatst die minimaal 80% van de vraagprijs is. Met deze functie worden alle gegevens opgevraagd
* en weergegeven in tabelvorm*/
function getReservations() {
    "use strict";
    var carinfo,reservationinfo, productId, telefoonnummer, bod, datum, htmlStrR, data, i;

    if (!document.getElementById("detailDiv")) {
        carinfo = document.getElementById('carInfo');
        carinfo.parentNode.removeChild(carinfo);

        reservationinfo = document.createElement('div');
        reservationinfo.id = "detailDiv";
        document.getElementById("content").appendChild(reservationinfo);
    }

    //Set the hash fragment
   // location.hash = "reserveringen";

    $.ajax({
        url: "/transactions/",
        type: "get",
        dataType: "json",
        success: function (retObj) {
            data = retObj.doc;

            htmlStrR = "<table id='reservationInfoTab' class='filter'>";
            htmlStrR += "<th>ProductId</th>";
            htmlStrR += "<th>Productdetails</th>";
            htmlStrR += "<th>Telefoonnummer</th>";
            htmlStrR += "<th>Bod</th>";
            htmlStrR += "<th>Datum</th>";

            htmlStrR += '<input type="submit" class="carButtons" value="Go back" onclick="goBack()"/></input>';
            for (i = 0; i < data.length; i += 1) {

                productId = data[i].productId;
                telefoonnummer = data[i].phonenumber;
                bod = data[i].bid;
                datum = data[i].date;

                htmlStrR += "<tr>";
                htmlStrR += "<td>";
                htmlStrR += productId;
                htmlStrR += "</td>";
                htmlStrR += "</td>";
                htmlStrR += "<td>";
                htmlStrR += '<input type="submit" class="carButtons" value="Productinformatie" onclick="getDetails(\'' + productId + '\')"/></input>';
                htmlStrR += "</td>";
                htmlStrR += "<td>";
                htmlStrR += telefoonnummer;
                htmlStrR += "</td>";
                htmlStrR += "<td>";
                htmlStrR += bod;
                htmlStrR += "</td>";
                htmlStrR += "<td>";
                htmlStrR += datum;
                htmlStrR += "</td>";
                htmlStrR += "</tr>";

            }
            htmlStrR += "</table>";


            $("#detailDiv").html(htmlStrR);
            new FilterTable({filterClass: 'filter'});
        }
    });

}

function bidBrandType(productId){
    var thisType;
    $.ajax({
        url: "/cars/" + productId,
        type: "get",
        dataType: "json",
        success: function (retObj) {
            data = retObj.doc;

            thisBrand = data.make;
            //thisType= data.style;

        }
    });
}

function goBack()
{
    var removeDet;

    if(document.getElementById('detailDiv')){
        removeDet = document.getElementById('detailDiv');
        removeDet.parentNode.removeChild(removeDet);
       // history.go(-1);
        getCars.getDocs();
    }

}

function formSubmit(){
    var dbUN, dbPW, deletelogin, carinfo;
    var inputUN = document.forms.loginform.gebruikersnaam.value;
    var password = document.forms.loginform.wachtwoord.value;
    $.ajax({
            url: "/relation/" + inputUN + "/" + password,
            type: "get",
            dataType: "json",

            success: function (res) {
                if (res.err.userExist === true) {
                  console.log("ingelogd");
                    createAdminHeader();
                    deletelogin = document.getElementById('loginform');
                    deletelogin.parentNode.removeChild(deletelogin);
                    adminMode = true;
                    getCars.getDocs();

                } else {
                  alert("Gebruikersnaam en/of wachtwoord onjuist!");
                }
            }
            }
    );
}

function getStatistics(){
    var carinfo,reservationinfo;

    if (!document.getElementById("detailDiv")) {
        carinfo = document.getElementById('carInfo');
        carinfo.parentNode.removeChild(carinfo);

        reservationinfo = document.createElement('div');
        reservationinfo.id = "detailDiv";
        document.getElementById("content").appendChild(reservationinfo);
    }

    $.ajax({
            url: "/cars/",
            type: "get",
            dataType: "json",
            success: function (retObj) {

                data = retObj.doc;
                aantalcars = data.length;

                htmlStr = "<table id='sorttable' class='filter'>";
                htmlStr += "<th>Merk</th>";
                htmlStr += "<th>Type</th>";
                htmlStr += "<th>Prijs</th>";
                htmlStr += "<th>Foto</th>";
                htmlStr += "<th>Status</th>";
                htmlStr += "<th>Datum</th>";


                for (i = 0; i < data.length; i += 1) {
                    symbols = data[i];
                    dbid = data[i]._id;
                    carid = data[i].id;
                    brand = data[i].make;
                    type = data[i].style;
                    fuel = data[i].fuel;
                    engine = data[i].engine;
                    power = data[i].power;
                    year = data[i].year;
                    color = data[i].color;
                    image = data[i].imageUrl;
                    price = data[i].price;
                    status = data[i].status;
                    date = data[i].modificationDate;


                    if(adminMode === true) {
                        htmlStr += "<tr>";
                        tdAlternately(i);
                        htmlStr += brand;
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += type;
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += price;
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += "<img " + "src=" + "images/autos/" + image + " width='70px'" + ">";
                        htmlStr += "</img>";
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += status;
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += date;
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += '<input type="submit" class="carButtons" value="Meer..." onclick="getDetails(\'' + dbid + '\')"/></input>';
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += '<input type="submit" class="carButtons" value="Verwijder" onclick="deleteCar(\'' + dbid + '\')"/></input>';
                        htmlStr += "</td>";
                        tdAlternately(i);
                        htmlStr += '<input type="submit" class="carButtons" value="Updaten" onclick="updateCar(\'' + dbid + '\')"/></input>';
                        htmlStr += "</td>";
                        htmlStr += "</tr>";

                    }



                }
                htmlStr += "</table>";
                var carinfo = document.createElement('div');
                carinfo.id = "carInfo";
                document.getElementById("content").appendChild(carinfo);
                $("#carInfo").html(htmlStr);
                new FilterTable({filterClass: 'filter'});
            }
        }
    );


}

function logUit(){
    //getCars.getDocs();

}

function createAdminHeader(){
    var header, newcar, newcarText, newRes, newResText, newsta, newstaText, uitloggen, uitlogText;

    header = document.getElementById('header');
    newcar = document.createElement('a');
    newcar.id = "newCar";
    newcar.addEventListener("click", function () {
        newCar();
    }, false);
    newcarText = document.createTextNode(" Auto toevoegen");
    newcar.appendChild(newcarText);
    header.appendChild(newcar);

    newRes = document.createElement('a');
    newRes.id = "newRes";
    newRes.addEventListener("click", function () {
        getReservations();
    }, false);
    newResText = document.createTextNode(" Reserveringen");
    newRes.appendChild(newResText);
    header.appendChild(newRes);

    newsta = document.createElement('a');
    newsta.id = "newSta";
    newsta.addEventListener("click", function () {
        getStatistics();
    }, false);
    newstaText = document.createTextNode(" Statistieken");
    newsta.appendChild(newstaText);
    header.appendChild(newsta);

    uitloggen = document.createElement('a');
    uitloggen.id = "uitloggen";
    uitloggen.addEventListener("click", function () {
        logUit();
    }, false);
    uitlogText = document.createTextNode(" Uitloggen");
    uitloggen.appendChild(uitlogText);
    header.appendChild(uitloggen);
}

/*Deze functie maakt de header aan. Met alle bijbehorende verwijzingen*/
function createHeader() {
    "use strict";
    var headerdiv, title, titletext, menudiv, htmlStrL, header, adminlogin, linkText;

    headerdiv = document.createElement('div');
    headerdiv.id = "header";
    document.getElementById("page").appendChild(headerdiv);

    title = document.createElement('h1');
    document.getElementById('header').appendChild(title);
    titletext = document.createTextNode("Autobay Heijink");
    title.appendChild(titletext);

    menudiv = document.createElement('div');
    menudiv.id = "headerMenu";
    document.getElementById("header").appendChild(menudiv);

    header = document.getElementById("header");
    adminlogin = document.createElement('a');
    adminlogin.id = "adminLogin";
    adminlogin.addEventListener("click", function () {
        htmlStrL =  "<form id='loginform'>";
        htmlStrL += "<tr>";
        htmlStrL += "<td>";
        htmlStrL += '<input type="text" name="gebruikersnaam">';
        htmlStrL += "</td>";
        htmlStrL += "<td>";
        htmlStrL += '<input type="password" name="wachtwoord">';
        htmlStrL += "</td>";
        htmlStrL += "<td>";
        htmlStrL += '<input type="button" value = "Log in" onclick="formSubmit()">';
        htmlStrL += "</td>";
        htmlStrL += "</tr>";
        htmlStrL += "</form>";

        $("#headerMenu").html(htmlStrL);
    }, false);
    linkText = document.createTextNode("Admin");
    adminlogin.appendChild(linkText);
    menudiv.appendChild(adminlogin);


}

$(document).ready(function () {
    "use strict";
    var contentdiv;
    createHeader();
    contentdiv = document.createElement('div');
    contentdiv.id = "content";
    document.getElementById("page").appendChild(contentdiv);
    getCars.getDocs();
    createMenu();
});