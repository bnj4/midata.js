import {VitalSigns} from './categories';
import {registerResource} from './registry';
import {ValueObservation, ValueQuantity} from "./Observation";

const tempCode = {
    "coding": [
        {
            "system": "http://acme.lab",
            "code": "BT",
            "display": "Body temperature"
        },
        // LOINC and SNOMED CT translations here - Note in the US the primary code
        // will be LOINC per meaningful use.  Further SNOMED CT  has acceeded
        // to LOINC being the primary coding system for vitals and
        // anthropromorphic measures.  SNOMED CT is required in some
        // countries such as the UK.
        {
            "system": "http://loinc.org",
            "code": "8310-5",
            "display": "Body temperature"
        },
        {
            "system": "http://snomed.info/sct",
            "code": "56342008",
            "display": "Temperature taking"
        }
    ],
    "text": "Body temperature"
};

@registerResource('258710007')
export class Temperature extends ValueObservation {
    constructor(tempC: number, date: Date) {
        let quantity: ValueQuantity = {
            _quantity: {
                value: tempC,
                unit: 'degrees C',
                code: '258710007',
                system: 'http://snomed.info/sct'
            }
        };
        super(quantity, date, tempCode, VitalSigns);
    }
}
;
