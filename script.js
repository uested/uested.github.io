

let ultData;
let currData;


let qwerCountryKey;



let gniChart;

let bubbleChart;

let bullet1;
let bullet2;
let bullet3;
let bullet4;

let pieGraph;

let seasonGraphh; 

console.log("hmmm")


// import { csv, sum } from 'd3';




function formatMoneyNum(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "M", "B", "T"];
        var suffixNum = Math.floor(("" + value).length / 3);
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
}


function formatMoneyNum2(labelValue) {
    // Nine Zeroes for Billions
    const FIXED_NUM = 2
    return Math.abs(Number(labelValue)).toFixed(FIXED_NUM) >= 1.0e+9

        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(FIXED_NUM) + "B"
        // Six Zeroes for Millions 
        : (Math.abs(Number(labelValue)) >= 1.0e+6)

            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(FIXED_NUM) + "M"
            // Three Zeroes for Thousands
            : (Math.abs(Number(labelValue)) >= 1.0e+3).toFixed(FIXED_NUM)

                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(FIXED_NUM) + "K"

                : Math.abs(Number(labelValue)).toFixed(FIXED_NUM);
}



function clearContent(inputCountry) {

    document.getElementById('totalFemaleEnrollment').innerHTML = ''
    document.getElementById('gniCard').innerHTML = ''
    document.getElementById('totalEnrollment').innerHTML = ''
    document.getElementById('maxTitle').innerHTML = ''
    document.getElementById('maxGross').innerHTML = ''
    document.getElementById('maxDate').innerHTML = ''
    document.getElementById('maxTheater').innerHTML = ''

    document.getElementById('maxTitle').innerHTML = ''
    document.getElementById('maxStudio').innerHTML = ''


    gniChart = Highcharts.chart('gniChart', {
        title: {
            text: 'Box Office Gross of U.S. Films from ' + inputCountry + ' not found'
        },

    });


    Highcharts.chart('seasonGraph', {
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text:   ''
        }
    });

    bubbleChart = Highcharts.chart('bubbleChart', {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Top 50 Grossing Movies by Season from ' + inputCountry + ' not found'
        }
    });

    pieGraph = Highcharts.chart('pieGraph', {

        title: {
            text: ''
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
    });


}

function changeContent(inputCountry) {

    console.log(currData[0])



    console.log("curr data is")
    console.log(inputCountry)


    // chk = d3.rollup(currData, v => d3.sum(v, d => d['Country Name:']), d => d['Indicator Name:'])

    // console.log(chk)

    let aha = d3.groups(currData,  d => d['Indicator Name'])

    // let testing =  d3.rollup(aha, v => d3.mean(v, d => d['value'])).toFixed(0)

    console.log(currData)
 

    // let aha = d3.groups(currData, d => d['Country Name'], d => d['Indicator Name'])

    console.log('hm')
    console.log(aha)

    let hr = aha[0][1]
    console.log(hr)
    let feature_school_enrollment =  (aha[21][1])

    console.log(aha)
    feature_school_enrollment =  d3.rollup(feature_school_enrollment, v => d3.mean(v, d => d['value'])).toFixed(0)
    
    let feature_girl_enrollment =  (aha[22][1])
    feature_girl_enrollment =  d3.rollup(feature_girl_enrollment, v => d3.mean(v, d => d['value'])).toFixed(0)
      
    
    let gnii =  (aha[0][1])
    let chk = d3.rollup(gnii, v => d3.mean(v, d => d['value'])).toFixed(2)

    console.log(chk)


  
    // athletesByNationSport.get("United States").get("Boxing")

    // console.log(    qwerCountryKey[inputCountry]['GNI per capita, Atlas method (current US$)'])
    // console.log( (qwerCountryKey.get(inputCountry)).get('GNI per capita, Atlas method (current US$)').value   )

    // let totalEnrollment = d3.sum(currData, d => d.total_gross);


    document.getElementById('gniCard').innerHTML =  '$' + chk
    document.getElementById('totalEnrollment').innerHTML = feature_school_enrollment 
    document.getElementById('totalFemaleEnrollment').innerHTML = feature_girl_enrollment







    //asdf
    console.log("curr is")

    gniData = currData.filter(function (d) {
        return d["Indicator Name"] === 'GNI per capita, Atlas method (current US$)'
    })
    let mapYear = d3.rollups(gniData, v => d3.sum(v, d => d.value), d => d.date)


    let featureVal = document.getElementById('selectFeature').value
    console.log("feature val is " + featureVal)

    enrollData = currData.filter(function (d) {
        return d["Indicator Name"] === featureVal


        // return d["Indicator Name"] === 'School enrollment, tertiary (% gross)'
    })
    let mapEnroll = d3.rollups(enrollData, v => d3.sum(v, d => d.value), d => d.date)


    let arrayYears = []
    let myArray = [];
    let enrollArray = []; 
    for (var i = 0, len = mapYear.length; i < len; i++) {
        myArray.push(mapYear[i][1]);
        arrayYears.push(mapYear[i][0])

        enrollArray.push(mapEnroll[i][1]);

    }


    gniChart = Highcharts.chart('gniChart', {
        title: {
            text: 'GNI vs ' + featureVal + ' in ' + inputCountry
        },

        subtitle: {
            //   text: ''
        },
  

        yAxis:  [{
            title: {
                text: featureVal,
                style: {
                  color:  '#0076A8'
                 
                }
            }
          }, {
            labels: {
                    formatter: function () {
                    return '$' + this.axis.defaultLabelFormatter.call(this);
                }
            },
            title: {
            

              text: 'GNI per capita ($)',
              style: { color:  '#43B02A'},
            },
            opposite: true  
          }],

        credits: {
            enabled: false
        },
        xAxis: {

            categories: arrayYears,



            title: {
                text: 'Year',
            }
        },

        tooltip: {
            pointFormatter: function () {
                var value;
                value = this.y

                // value = '$ ' + this.y

                return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: <b>' + value + '</b><br />'
            },
        },

        // legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'middle'
        // },

        plotOptions: {
            series: {
            }
        },

        series: [{
            name: 'GNI per capita',
            yAxis: 1,
            data: myArray,
            color: '#43B02A'
        },
        {
            name: featureVal,
            data: enrollArray,
            color: '#0076A8'
        }


        ],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });




    var topData = currData.slice().sort((a, b) => d3.descending(a.gross, b.gross)).slice(0, 50)

    let bubbleData = d3.groups(topData, d => d.season)



    let tempBubble = []



    // console.log(bubbleData)

    for (var i = 0; i < bubbleData.length; i++) {


        hm = bubbleData[i][1]

        let storeBubble = {}


        storeBubble.name = bubbleData[i][0]

        const resultArray = hm.map(elm => ({ name: elm.title, value: elm.gross }));

        storeBubble.data = resultArray


        let season = (bubbleData[i][0])

        if (season === 'Fall') {
            storeBubble.color = '#f08a0e'
        }
        else if (season === 'Summer') {
            storeBubble.color = '#064d69'
        }
        else if (season === 'Spring') {
            storeBubble.color = '#edbed4'
        }
        else if (season === 'Winter') {
            storeBubble.color = '#ccd7db'
        }
        else if (season === 'Holiday Season') {
            storeBubble.color = '#e23046'
        }



        tempBubble.push(storeBubble)


    }



    tempBubble.push({
        name: 'dummy series',
        data: [{ x: 6, y: 6, z: 6 }],
        showInLegend: false,
        color: 'transparent',
        enableMouseTracking: false
    })











}






function changeCountries2(){
    let hm = document.getElementById('selectCountry').value
    changeCountry(hm)
}

function changeCountry(inputCountry) {
    console.log(inputCountry)
    console.log("currtime")
    console.log(ultData)

    if (inputCountry === 'all') {
        currData = ultData
    }   
    else if (inputCountry === 'High Income') {
        console.log("testing high income times")
        currData = ultData.filter(function (d) {
            return d["Income Group"] === 'High income'
        })

        console.log(currData)
    } 
    else if (inputCountry === 'Upper middle income') {
        currData = ultData.filter(function (d) {
            return d["Income Group"] === 'Upper middle income'
        })
    }   
    else if (inputCountry === 'Lower middle income') {
        currData = ultData.filter(function (d) {
            return d["Income Group"] === 'Lower middle income'
        })
    }   
    else if (inputCountry === 'Low Income') {
        currData = ultData.filter(function (d) {
            return d["Income Group"] === 'Low income'
        })
    }     
    else {
        currData = ultData.filter(function (d) {
            return d["Country Name"] === inputCountry
        })

    }

    console.log(inputCountry + " has been changed " + String(currData.length))


  

    if (currData.length == 0) {
        alert("Sorry, " + inputCountry + " is not a valid country or income group, please search for another in the list.")

        clearContent(inputCountry)

    }
    else {



        let startDate = document.getElementById('startDate').value
        let endDate = document.getElementById('endDate').value
        
        document.getElementById('currdates1').innerHTML = '(' + startDate + '-' + endDate + ')'
        document.getElementById('currdates2').innerHTML = '(' + startDate + '-' + endDate + ')'
        document.getElementById('currdates3').innerHTML = '(' + startDate + '-' + endDate + ')'


        console.log(startDate)
        console.log(endDate)

        // console.log(currData)
        let dateStart = '1970'
        let dateEnd = '2018'
        checkData = currData.filter(function (d) {
           
            return d.date >= startDate;
        })
        checkData = checkData.filter(function (d) {
            return d.date <= endDate;
        })

        currData = checkData

        if (currData.length == 0) {
            // alert("Sorry, " + inputCountry + " does not have data from " + dateStart + " to " + dateEnd + " Please choose a different range of dates")
            clearContent(inputCountry)

        }
        else {

            changeContent(inputCountry)

        }

        // :))))












    }



}


function changeLineChart(inputCountry) {



}




window.onload = function () {




    
console.log("CLICKING ")

var toggler = document.getElementsByClassName("caretToggle");
var i;

for (i = 0; i < toggler.length; i++) {

    console.log("caretting ")
  toggler[i].addEventListener("click", function() {
      console.log("clicKING TESt")
    this.parentElement.querySelector(".nestedToggle").classList.toggle("activeToggle");
    this.classList.toggle("caret-down");
  });
}




    function studioListener() {
        let inputCountry = this.value
        // console.log("Changing to " + inputCountry)
        changeCountry(inputCountry)
    }

    let eStudio = document.getElementById('selectCountry');
    eStudio.addEventListener('change', studioListener);


    function featureListener() {
        let inputCountry = document.getElementById('selectCountry').value
        changeCountry(inputCountry)
    }

    let eFeature = document.getElementById('selectFeature');
    eFeature.addEventListener('change', featureListener);




    function startDateListener() {

        console.log("changing date ")



        let studio = document.getElementById('selectCountry').value
        changeCountry(studio)
    }


    // var sliderDiv = document.getElementById("slider-range");
    // sliderDiv.addEventListener('change', startDateListener);





    d3.csv("./educ_pivot.csv")
        .then(data => {

            // rolls = d3.group(data, d => d['Country Name'], d => d['Indicator Name'], d => d['Date'])
            qwerCountryKey = d3.groups(data, d => d['Country Name'], d => d['Indicator Name'])
   

            // to make sure max returns correct
            data.forEach(function (d) {
                // console.log(d)
                d.date = d.Date;


                // d.total_gross = d.total_gross;
                // d.gross = parseInt(d.gross);
            });


            const total = d3.sum(data, d => d.theaters);
            ultData = data
            // console.log(ultData)







            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                },

                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
            });


            // STEP 1: start off with everything 'ALL'
            changeCountry('all')




         







        });






}


