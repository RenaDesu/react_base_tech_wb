"use strict";
var SubSystemType;
(function (SubSystemType) {
    SubSystemType[SubSystemType["Engine"] = 0] = "Engine";
    SubSystemType[SubSystemType["Transmission"] = 1] = "Transmission";
})(SubSystemType || (SubSystemType = {}));
const carAudiInfo = {
    brand: 'Audi',
    wheelsNumber: 4,
    doorsNumber: 3,
    engine: {
        engineInfo: {
            enginePower: 150,
            engineConfiguration: 'Inline-4 20v DOHC Turbocharger',
        },
        state: 'normal',
    },
    transmission: {
        transmissionInfo: {
            transmissionType: 'Automatic',
        },
        state: 'normal',
    },
};
class CarSystem {
    constructor(carInfo) {
        this.carInfo = carInfo;
        this.carMainInfo = this._getCarMainInfo(carInfo);
        this.engineInfo = this._getCarSubSystemInfo(carInfo, 0);
        this.transmissionInfo = this._getCarSubSystemInfo(carInfo, 1);
        this.engineState = this._getCarSubSystemState(carInfo, 0);
        this.transmissionState = this._getCarSubSystemState(carInfo, 1);
    }
    _getCarMainInfo(info) {
        let carInfo = [];
        Object.entries(info).forEach(([key, value]) => {
            if (key === 'brand' || key === 'wheelsNumber' || key === 'doorsNumber') {
                carInfo.push(`${key}: ${value}`);
            }
        });
        return carInfo.join(', ');
    }
    _getCarSubSystemInfo(info, subSystem) {
        let subSystemInfo = [];
        Object.entries(subSystem === 0 ? info.engine.engineInfo : info.transmission.transmissionInfo).forEach(([key, value]) => {
            subSystemInfo.push(`${key}: ${value}`);
        });
        return subSystemInfo.join(', ');
    }
    _getCarSubSystemState(info, subSystem) {
        let subSystemState = '';
        subSystemState = subSystem === 0 ? `Engine state: ${info.engine.state}` : `Transmission state: ${info.transmission.state}`;
        return subSystemState;
    }
    setCarMainInfo(brand, wheelsNumber, doorsNumber) {
        this.carMainInfo = `brand: ${brand}, wheelsNumber: ${wheelsNumber}, doorsNumber: ${doorsNumber}`;
    }
    setCarSubSystemInfo(subSystem, info) {
        let subSystemInfo = [];
        Object.entries(info).forEach(([key, value]) => {
            subSystemInfo.push(`${key}: ${value}`);
        });
        if (subSystem === 0) {
            this.engineInfo = subSystemInfo.join(', ');
        }
        else {
            this.transmissionInfo = subSystemInfo.join(', ');
        }
    }
    setCarSubSystemState(subSystem, state) {
        if (subSystem === 0) {
            this.engineState = `Engine state: ${state}`;
        }
        else {
            this.transmissionState = `Transmission state: ${state}`;
        }
    }
}
const carAudi = new CarSystem(carAudiInfo);
const carAudiMainInfo = carAudi.carMainInfo;
const carAudiEngineInfo = carAudi.engineInfo;
const carAudiTransmissionInfo = carAudi.transmissionInfo;
const carAudiEngineState = carAudi.engineState;
const carAudiTransmissionState = carAudi.transmissionState;
console.log(carAudiMainInfo, '| carAudiMainInfo');
console.log(carAudiEngineInfo, '| carAudiEngineInfo');
console.log(carAudiTransmissionInfo, '| carAudiTransmissionInfo');
console.log(carAudiEngineState, '| carAudiEngineState');
console.log(carAudiTransmissionState, '| carAudiTransmissionState');
carAudi.setCarSubSystemState(0, 'bad');
console.log(carAudi.engineState);
carAudi.setCarSubSystemInfo(0, { enginePower: 250, engineConfiguration: 'VR6 24v DOHC' });
console.log(carAudi.engineInfo);
carAudi.setCarMainInfo('BMW', 4, 5);
console.log(carAudi.carMainInfo);
