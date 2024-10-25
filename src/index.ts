interface Car {
    brand: string;
    wheelsNumber: number,
    doorsNumber: number,
    engine: Engine,
    transmission: Transmission,
}

interface Engine {
    engineInfo: EngineInfo,
    state: string,
}

interface EngineInfo {
    enginePower: number,
    engineConfiguration: string,
}

interface Transmission {
    transmissionInfo: TransmissionInfo,
    state: string,
}

interface TransmissionInfo {
    transmissionType: string,
}

enum SubSystemType {
    Engine,
    Transmission,
}

const carAudiInfo: Car = {
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
    carMainInfo: string;
    engineInfo: string;
    transmissionInfo: string;
    engineState: string;
    transmissionState: string;

    constructor(carInfo: Car) {
        this.carMainInfo = this._getCarMainInfo(carInfo);
        this.engineInfo = this._getCarSubSystemInfo(carInfo, 0);
        this.transmissionInfo = this._getCarSubSystemInfo(carInfo, 1);
        this.engineState = this._getCarSubSystemState(carInfo, 0);
        this.transmissionState = this._getCarSubSystemState(carInfo, 1);
    }

    private _getCarMainInfo(info: Car): string {
        let carInfo: Array<string> = [];
        Object.entries(info).forEach(([key, value]) => {
            if (key === 'brand' || key === 'wheelsNumber' || key === 'doorsNumber') {
                carInfo.push(`${key}: ${value}`);
            }
        });
        return carInfo.join(', ');
    }

    private _getCarSubSystemInfo(info: Car, subSystem: SubSystemType): string {
        let subSystemInfo: Array<string> = [];
        Object.entries(subSystem === 0 ? info.engine.engineInfo : info.transmission.transmissionInfo).forEach(([key, value]) => {
            subSystemInfo.push(`${key}: ${value}`);
        });
        return subSystemInfo.join(', ');
    }

    private _getCarSubSystemState(info: Car, subSystem: SubSystemType): string {
        let subSystemState: string = '';

        subSystemState = subSystem === 0 ? `Engine state: ${info.engine.state}` : `Transmission state: ${info.transmission.state}`;
    
        return subSystemState;
    }

   setCarMainInfo(brand: string, wheelsNumber: number, doorsNumber: number): void {
        this.carMainInfo = `brand: ${brand}, wheelsNumber: ${wheelsNumber}, doorsNumber: ${doorsNumber}`
    }

    setCarSubSystemInfo(subSystem: SubSystemType, info: EngineInfo | TransmissionInfo): void {
        let subSystemInfo: Array<string> = [];
        Object.entries(info).forEach(([key, value]) => {
            subSystemInfo.push(`${key}: ${value}`);
        });
        if (subSystem === 0) {
            this.engineInfo = subSystemInfo.join(', ');
        } else {
            this.transmissionInfo = subSystemInfo.join(', ');
        }
    }

    setCarSubSystemState(subSystem: SubSystemType, state: string): void {
        if (subSystem === 0) {
            this.engineState = `Engine state: ${state}`;
        } else {
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