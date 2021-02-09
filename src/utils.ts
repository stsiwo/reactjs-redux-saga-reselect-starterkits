//import { QueryStringType } from "requests/types";
const uuidv4 = require('uuid/v4')
import isEmpty from "lodash/isEmpty";
import { PageLinkType } from 'components/common/Pagination/types';


export const dateFormatOption = { year: 'numeric', month: 'long', day: 'numeric' }

//export const buildQueryString = (queryStringObject: QueryStringType = {}): string => {
//
//  if (isEmpty(queryStringObject)) return ''
//
//  return '?' + Object.keys(queryStringObject)
//    .filter(key => queryStringObject[key] !== null && queryStringObject[key] !== undefined && queryStringObject[key].lenth != 0 && queryStringObject[key] != '')
//    .map(key => {
//      if (queryStringObject[key] instanceof Date) 
//        return key + '=' + (queryStringObject[key] as Date).toISOString()
//      if (key === 'category') {
//        if (queryStringObject[key] instanceof Object) // if category value if object (CategoryType)
//          return key + '=' + queryStringObject[key].name
//      }
//
//      return key + '=' + queryStringObject[key]
//    })
//    .join('&')
//}

export function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  else return null;
}

export function generateFileWithUuidv4(targetFile: File) {
  const blob: Blob = targetFile.slice(0, targetFile.size, targetFile.type)
  return new File([blob], targetFile.name.replace(/.*(?=\.)/, uuidv4()), { type: targetFile.type })
}

export function getUuidv4() {
  return uuidv4()
}

export function getTimeOneHourAfter() {
  const dt = new Date();
  dt.setHours(dt.getHours() + 1)
  return dt.getTime()
}

/**
 * check two object has the same properties (could have different values for the same properties)
 *  - just check two object has same form (properties) or not
 **/
export function isSameObjectForm(a: object, b: object): boolean {
  let isSame = true
  Object.keys(a).forEach((key: string) => {
    if (!b.hasOwnProperty(key)) {
      isSame = false
    }
  })
  return isSame
}

export function transformObject<A extends object, B extends object>(original: A, destination: B): B {
  if (!isSameObjectForm(original, destination)) {

  }
  else return destination
}

/**
 * be careful !!!!
 * January is 0
 * December is 11
 **/
export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function generateQueryString(target: { [key: string]: any }): string {
  const keys = Object.keys(target)
  let queryString = "?"
  keys.forEach((key: string) => {
    queryString += key + "=" + target[key] + "&"
  })
  queryString = queryString.substring(0, queryString.length - 1)
  return queryString
}

export function toDateString(date: Date): string {
  return date.toLocaleDateString("en-US", dateFormatOption)
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getLatestDate(date1: Date, date2: Date) {
  return (date1.getDate() < date2.getDate()) ? date2 : date1
}

/**
 * scroll features (onScroll)
 *
 *  - DEPRECIATED!! dont use this
 *
 **/

export const getPercentageOfScrollPosition: (curScrollPos: number, maxScrollPos: number, minScrollPos: number) => number = (curScrollPos, maxScrollPos, minScrollPos) => {
  return ((curScrollPos - minScrollPos) * 100) / (maxScrollPos - minScrollPos)
}

/**
 * should return the value from "unitConsistentY = (inner element height) - (unit scroll top (= unitScrollPercentage * 10))"
 **/
export const calcUnitConsistentY: (innerElementHeight: number, unitScrollPercentage: number, elId: number) => number = (innerElementHeight, unitScrollPercentage, elId) => {
  return -1 * elId * (innerElementHeight - (unitScrollPercentage * 10) + 18)
}

export const calcCurGapX: (curScrollPercentage: number, elId: number, unitScrollPercentage: number, length: number, unitGapX: number) => number = (curScrollPercentage, elId, unitScrollPercentage, length, unitGapX) => {
  // when position Y of this element is above than cur scroll position, we need to decrease the gap scale 
  if ((unitScrollPercentage * elId) <= curScrollPercentage) {
    return -1 * ((unitGapX / unitScrollPercentage) * curScrollPercentage) + (elId * unitGapX)
  } else {
    // when position Y of this element is below than cur scroll position, we need to increase the gap scale
    return ((unitGapX / unitScrollPercentage) * curScrollPercentage) - (elId * unitGapX)
  }
}

export const calcCurCirleGapX: (curScrollPercentage: number, elId: number, unitScrollPercentage: number, circleGapXCoefficient?: number, radius?: number) => number = (curScrollPercentage, elId, unitScrollPercentage, circleGapXCoefficient = 1, radius = 100) => {
  return (circleGapXCoefficient) * ((-1 * radius) + Math.sqrt(-1 * Math.pow(curScrollPercentage - (elId * unitScrollPercentage), 2) + Math.pow(radius, 2)))
}

export const calcCurScaleGap: (curScrollPercentage: number, elId: number, unitScrollPercentage: number, length: number) => number = (curScrollPercentage, elId, unitScrollPercentage, length) => {

  // when position Y of this element is above than cur scroll position, we need to decrease the gap scale 
  if ((unitScrollPercentage * elId) <= curScrollPercentage) {
    return (-1 / 100) * curScrollPercentage + (1 + (elId * (1 / (length - 1))))
  } else {
    // when position Y of this element is below than cur scroll position, we need to increase the gap scale
    return (1 / 100) * curScrollPercentage + (1 - (elId * (1 / (length - 1))))
  }
}

export const calcCurVisibility: (curScrollPercentage: number, elId: number, unitScrollPercentage: number, visibleUnitElementNumber: number) => boolean = (curScrollPercentage, elId, unitScrollPercentage, visibleUnitElementNumber) => {

  if ((curScrollPercentage + (visibleUnitElementNumber * unitScrollPercentage) >= (elId * unitScrollPercentage)) && (curScrollPercentage - (visibleUnitElementNumber * unitScrollPercentage) <= (elId * unitScrollPercentage))) {
    return true
  } else {
    return false
  }
}

export const calcCurOverlapY: (curScrollPercentage: number, elId: number, unitScrollPercentage: number, length: number, unitOverlapYCoefficient: number) => number = (curScrollPercentage, elId, unitScrollPercentage, length, unitOverlapYCoefficient) => {

  // curScrollPosition percentage is above than its unit scroll percentage, we need to increase the the gap
  // also, reverse the sign (+ -> -) for 'translate(-xxpx)'
  if ((unitScrollPercentage * elId) <= curScrollPercentage) {
    return unitOverlapYCoefficient * Math.pow((curScrollPercentage - (unitScrollPercentage * elId)), 2)
  } else {
    // curScrollPosition percentage is less than its unit scroll percentage, we need to decrease the the gap
    return (-1) * unitOverlapYCoefficient * Math.pow((curScrollPercentage - (unitScrollPercentage * elId)), 2)
  }
}

/**
 * new scroll elements on circle feature (onWheel)
 *
 **/

/**
 * calc the scale of current element. 
 *
 *  - if the deg of the element == 0 mod 360, scale = 1
 *  - if the deg of the element == 180 mod 360, scale = 0
 *
 **/
export const calcScale: (deg: number, targetZeroDeg?: number) => number = (deg, targetZeroDeg = 90) => {

  //const degModAbs = Math.abs(deg % 360)
  //const scaleRangeAbs = Math.abs((degModAbs - targetZeroDeg) / 180)
  //return scaleRangeAbs
  
  const scale = 1/2 * Math.cos(convertDegToRadian(deg + targetZeroDeg)) + 1/2
  if (scale < 1/4) return 1/4
  return scale
}

/**
 * calc z-index of the current element
 *
 *  - reuse 'calcScale' since it has the same logic
 *
 **/
export const calcZIndex: (deg: number) => number = (deg) => {

  const scaleValue = calcScale(deg);

  /**
   * scale value must around 8750 (this is the z-index of icon at the center)
   *
   *  - 0 <= scaleValue * 100 <= 100
   *  - 8700 <= (scalevalue * 100 + 8700) <= 8800
   *
   **/
  return Math.round(scaleValue * 100 + 8700)
}

/**
 * make the element visible when followings:
 *  - (+): deg < 90 and deg > 270
 *  - (-): -90 > deg and -270 < deg
 *
 *  => make this visible only when the element comes in the right side of circle
 **/
export const calcVisibility: (deg: number) => boolean = (deg) => {

  const degModAbs = Math.abs(deg % 360)
  if (degModAbs < 90 || degModAbs > 270) return true;
  return false;
}

export const calcCenterPosX: (offsetLeft: number, clientWidth: number) => number = (offsetLeft, clientWidth) => {
  // overflow when calc actual centerX so return 0 instead
  return (clientWidth / 2)
  //return (clientWidth / 3)
  //return 0
}

export const calcCenterPosY: (offsetTop: number, clientHeigt: number) => number = (offsetTop, clientHeigt) => {
  // put extra in order to make it center. (e.g., subtract half height of the element size)
  return (clientHeigt / 2)
  //return (clientHeigt / 2) - 100;
}

export const calcCurPosX: (elId: number, r: number, unitDegree: number, alphaDeg?: number) => number = (elId, r, unitDegree, alphaDeg) => {
  return r * Math.cos(convertDegToRadian((unitDegree * elId) + alphaDeg))
}

export const calcCurPosY: (elId: number, r: number, unitDegree: number, alphaDeg?: number) => number = (elId, r, unitDegree, alphaDeg) => {
  // need to make it 'minus' since y asix is the opposite to math
  return (-1) * r * Math.sin(convertDegToRadian((unitDegree * elId) + alphaDeg))
}

export const convertDegToRadian: (deg: number) => number = (deg) => {
  return deg * (Math.PI / 180)
}

/**
 * calc radiusWidth of ellipse
 *
 **/
export const calcRadiusWidth: (maxWidth: number) => number = (maxWidth) => {
  return maxWidth * 0.7 / 2
}

/**
 * calc radiusHeight of ellipse
 *
 **/
export const calcRadiusHeight: (maxHeight: number) => number = (maxHeight) => {
  return maxHeight * 0.3 / 2
}

/**
 * ellipse formula
 *
 **/
export const calcCurEllipsePosX: (elId: number, radiusWidth: number, radiusHeight: number, unitDegree: number, alphaDeg?: number) => number = (elId, radiusWidth, radiusHeight, unitDegree, alphaDeg) => {
  // need to separate for + and -
  
  const curDeg = (unitDegree * elId) + alphaDeg
  const curY = radiusHeight * Math.sin(convertDegToRadian(curDeg)) // y = b * sin(theta)
  return radiusWidth * Math.cos(convertDegToRadian(curDeg))
}

export const calcCurEllipsePosY: (elId: number, radiusWidth: number, radiusHeight: number, unitDegree: number, alphaDeg?: number) => number = (elId, radiusWidth, radiusHeight, unitDegree, alphaDeg) => {
  // need to separate for + and -
  const curDeg = (unitDegree * elId) + alphaDeg
  const curX = radiusWidth * Math.cos(convertDegToRadian(curDeg)) // y = a * cos(theta)
  // since browser x-y asix is the oppsite to math, change sign (- & +)
  return - radiusHeight * Math.sin(convertDegToRadian(curDeg))
}

/**
 * pagination
 **/
export const convertPageToOffset: (total: number, limit: number, page: number) => number = (total, limit, page) => {
  return (page - 1) * limit;
}

export const convertOffsetToPage: (total: number, limit: number, offset: number) => number = (total, limit, offset) => {
  return (offset / limit) + 1;
}

export const calculateMaxPageNumber: (total: number, limit: number) => number = (total, limit) => {
  return Math.ceil(total / limit)
}

export const generatePageLinkSlice: (begin: number, end: number) => PageLinkType[] = (begin, end) => {
  const pageLinks: PageLinkType[] = []

  for (let i = begin; i < end; i++) {
    pageLinks.push({ num: i })
  }

  return pageLinks
}

export const generatePaginationLink: (total: number, limit: number, curPage: number, btnNum: number) => PageLinkType[] = (total, limit, curPage, btnNum) => {

  const leftNum = Math.floor(btnNum/2);
  const rightNum = Math.floor(btnNum/2);
  const maxPageNum = calculateMaxPageNumber(total, limit);

  if (total <= limit) {
    return [];
  }

  if (curPage <= leftNum + 1) {
    let upperPageNum
    if (maxPageNum - btnNum > 0) {
      upperPageNum = btnNum
    } else {
      upperPageNum = maxPageNum
    }

    return generatePageLinkSlice(1, upperPageNum+1)
  } else if (maxPageNum - curPage < rightNum + 1) {
    return generatePageLinkSlice(maxPageNum - (btnNum - 1), maxPageNum + 1)
  } else {
    let lowerPageNum; 
    if (curPage - leftNum < 0) {
      lowerPageNum = 1;
    } else {
      lowerPageNum = curPage - leftNum
    }
    let upperPageNum 
    if (curPage + rightNum > maxPageNum) {
      upperPageNum = maxPageNum
    } else {
      upperPageNum = curPage + rightNum
    }
    return generatePageLinkSlice(lowerPageNum, upperPageNum + 1)
  }

}

