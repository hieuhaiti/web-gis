
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
        return ["blue", '#3399ff', "#000000", '']
    }
    if (data === 1) {
        return ["green", '#4cb84c', "#000000", 'Chất lượng ko khí ở mức tốt']
    }
    else if (data === 2) {
        return ['yellow', '#ffff00', "#000000", 'Chất lượng ko khí ở mức trung bình']
    }
    else if (data === 3) {
        return ['orange', '#ffa500', "#000000", 'Chất lượng ko khí ở mức kém']
    }
    else if (data === 4) {
        return ['grey', '#808080', "#ffffff", 'Chất lượng ko khí xấu']
    }
    else if (data === 5) {
        return ['red', '#d81e1e', "#ffffff", 'Ô nhiễm không khí ở mức rất xấu']
    }
    else if (data === 6) {
        return ['violet', '#ab19ab', "#ffffff", 'Chất lượng ko khí ở nguy hiểm']
    }
}


// function ModalBodyDisplay(Data, typeOfPollution) {
//     <div dangerouslySetInnerHTML={{
//         __html: (() => {
//             let result = `<table>
//           <tbody>
//           <tr>
//           <td class="column1">${keys[2]}: ${props.data[id][keys[2]].iso.slice(0, 10)}</td>`
//             if (color[1] === "#4cb84c") {
//                 result += `<td class="column2"><u>${color[4]}</u> so với kiểu dữ liệu bạn quan tâm</td>`
//             }
//             else if (color[1] !== "#4cb84c") {
//                 result += `<td class="column2"><u>${color[4]}</u> so với kiểu dữ liệu bạn quan tâm</td>`
//             }


//             for (let index = 3; index < keys.length; index++) {
//                 if (keys[index] === mainPollutant[1]) {
//                     result += `<tr>
//               <td class="column1"><b>${keys[index].toUpperCase()}: ${props.data[id][keys[index]].value}</b></td>
//               <td class="column2"><div class="progress custom-progress-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]}">
//                 <div class="progress-bar custom-progress-bar-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]} progress-bar" role="progressbar"  style="width: ${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[0]}%" </div>
//               </div></td>
//               </tr>`;
//                 }
//                 else {
//                     result += `<tr>
//               <td class="column1">${keys[index].toUpperCase()}: ${props.data[id][keys[index]].value}</td>
//               <td class="column2"><div class="progress custom-progress-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]}">
//                 <div class="progress-bar custom-progress-bar-${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[1]} progress-bar" role="progressbar"  style="width: ${checkProgress(constructor, keys[index], props.data[id][keys[index]].value)[0]}%" </div>
//               </div></td>
//               </tr>`;
//                 }
//             }
//             result += `</table>`

//             return result;
//         })()
//     }} />);
// }
export { CaculationDate, AddFilter, GetMainPollution, }