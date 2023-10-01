// Import Image

import greenFace from "../assets/images/ic-face-green.svg";
import yellowFace from "../assets/images/ic-face-yellow.svg";
import orangeFace from "../assets/images/ic-face-orange.svg";
import greyFace from "../assets/images/ic-face-grey.svg";
import redFace from "../assets/images/ic-face-red.svg";
import violetFace from "../assets/images/ic-face-purple.svg";

// Import recommendations

import recommendationGreenSport from "../assets/images/recommendationGreenSport.svg";
import recommendationGreenWindow from "../assets/images/recommendationGreenWindow.svg";

import recommendationGreyAirpurifier from "../assets/images/recommendationGreyAirpurifier.svg";
import recommendationGreyMask from "../assets/images/recommendationGreyMask.svg";
import recommendationGreySport from "../assets/images/recommendationGreySport.svg";
import recommendationGreyWindow from "../assets/images/recommendationGreyWindow.svg";

import recommendationOrangeAirpurifier from "../assets/images/recommendationOrangeAirpurifier.svg";
import recommendationOrangeMask from "../assets/images/recommendationOrangeMask.svg";
import recommendationOrangeSport from "../assets/images/recommendationOrangeSport.svg";
import recommendationOrangeWindow from "../assets/images/recommendationOrangeWindow.svg";

import recommendationPurpleAirpurifier from "../assets/images/recommendationPurpleAirpurifier.svg";
import recommendationPurpleMask from "../assets/images/recommendationPurpleMask.svg";
import recommendationPurpleSport from "../assets/images/recommendationPurpleSport.svg";
import recommendationPurpleWindow from "../assets/images/recommendationPurpleWindow.svg";

import recommendationRedAirpurifier from "../assets/images/recommendationRedAirpurifier.svg";
import recommendationRedMask from "../assets/images/recommendationRedMask.svg";
import recommendationRedSport from "../assets/images/recommendationRedSport.svg";
import recommendationRedWindow from "../assets/images/recommendationRedWindow.svg";

import recommendationYellowAirpurifier from "../assets/images/recommendationYellowAirpurifier.svg";
import recommendationYellowMask from "../assets/images/recommendationYellowMask.svg";
import recommendationYellowSport from "../assets/images/recommendationYellowSport.svg";
import recommendationYellowWindow from "../assets/images/recommendationYellowWindow.svg";



function CaculationDate(inputDateTypeString) {
    const [yearStr, monthStr] = inputDateTypeString.split('-');

    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    // Thực hiện phép cộng 1 vào tháng
    const newMonth = month + 1;

    // Tạo lại chuỗi kết quả
    const result = `${year + Math.floor(newMonth / 13)}-${(newMonth % 12) || 12}`;

    return (result);

}

function AddFilter(nameOfRow) {
    let div = document.querySelector(`#${nameOfRow}`).parentElement;

    function filterIcon() {
        return `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6c0,0,3.72-4.8,5.74-7.39 C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>`
    }


    let filterSpan = document.createElement("span");
    filterSpan.style.float = "right";
    filterSpan.style.height = "20px";
    filterSpan.style.opacity = 0.3;
    filterSpan.innerHTML = filterIcon();
    filterSpan.onmouseenter = function () {
        this.style.opacity = 1;
    };
    filterSpan.onmouseleave = function () {
        this.style.opacity = 0.3;
    };

    let insertRow = div.children[2];

    div.insertBefore(filterSpan, insertRow);

    return (filterSpan)
}

function GetMainPollution(Data) {
    let tempObj = {
        tsp: parseInt(Data.tsp.result),
        so2: parseInt(Data.so2.result),
        no2: parseInt(Data.no2.result)
    }
    var values = Object.values(tempObj);
    var maxValue = Math.max.apply(null, values);

    // Find the index of the maximum value
    var indexMaxValue = values.indexOf(maxValue);

    // Get the property name associated with the maximum value
    var propertyNames = Object.keys(tempObj);
    var mainPollution = propertyNames[indexMaxValue];

    return [mainPollution, maxValue];
}

function GetColorOfMarker(data) {
    if (data === "0") {
        return ["blue",
        '#3399ff',
        "#ffffff", "", "", "", "", "", ""]
    }
    if (data === 1) {
        return ["green",
        '#4cb84c',
        "#ffffff",
        'Chất lượng ko khí ở mức tốt',
        greenFace, " ", " ",
        recommendationGreenSport,
        recommendationGreenWindow
    ]
    }
    else if (data === 2) {
        return ['yellow',
        '#ffff00',
        "#ffffff",
        'Chất lượng ko khí ở mức trung bình',
        yellowFace,
        recommendationYellowAirpurifier,
        recommendationYellowMask,
        recommendationYellowSport,
        recommendationYellowWindow
    ]
    }
    else if (data === 3) {
        return ['orange',
        '#ffa500',
        "#ffffff",
        'Chất lượng ko khí ở mức kém',
        orangeFace,
        recommendationOrangeAirpurifier,
        recommendationOrangeMask,
        recommendationOrangeSport,
        recommendationOrangeWindow
    ]
    }
    else if (data === 4) {
        return ['grey',
        '#808080',
        "#ffffff",
        'Chất lượng ko khí xấu',
        greyFace,
        recommendationGreyAirpurifier,
        recommendationGreyMask,
        recommendationGreySport,
        recommendationGreyWindow
    ]
    }
    else if (data === 5) {
        return ['red',
        '#d81e1e',
        "#ffffff",
        'Ô nhiễm không khí ở mức rất xấu',
        redFace,
        recommendationRedAirpurifier,
        recommendationRedMask,
        recommendationRedSport,
        recommendationRedWindow
    ]
    }
    else if (data === 6) {
        return ['violet',
        '#ab19ab',
        "#ffffff",
        'Chất lượng ko khí ở nguy hiểm',
        violetFace,
        recommendationPurpleAirpurifier,
        recommendationPurpleMask,
        recommendationPurpleSport,
        recommendationPurpleWindow
    ]
    }
}

export { CaculationDate, AddFilter, GetMainPollution, GetColorOfMarker}
