// Element array (with name and symbol) can be kept in a separate file (elements.js) and imported.

function calculate() {
    const atomicNumber = parseInt(document.querySelector('#atomicNumber').value);
    const distributionType = document.querySelector('#distributionType').value;
    const elementDiv = document.querySelector('.element-name');
    const result = document.querySelector('.result');

    if (atomicNumber >= 1 && atomicNumber <= elements.length - 1) {
        const element = elements[atomicNumber];
        let electronConfiguration;

        if (distributionType === 'nearestInertGas') {
            electronConfiguration = getConfigurationByNearestInertGas(atomicNumber);
        } else {
            
            electronConfiguration = getTraditionalConfiguration(atomicNumber).configartion;
        }

        elementDiv.textContent = `Element: ${element.name} (${element.symbol})`;
        result.innerHTML = `Electron Configuration: ${electronConfiguration}`;
    } else {
        elementDiv.textContent = 'Invalid atomic number';
        result.textContent = '';
    }
}

function getTraditionalConfiguration(atomicNumber) {
    const sublevels = [
        { name: '1s', maxElectrons: 2 },
        { name: '2s', maxElectrons: 2 },
        { name: '2p', maxElectrons: 6 },
        { name: '3s', maxElectrons: 2 },
        { name: '3p', maxElectrons: 6 },
        { name: '4s', maxElectrons: 2 },
        { name: '3d', maxElectrons: 10 },
        { name: '4p', maxElectrons: 6 },
        { name: '5s', maxElectrons: 2 },
        { name: '4d', maxElectrons: 10 },
        { name: '5p', maxElectrons: 6 },
        { name: '6s', maxElectrons: 2 },
        { name: '4f', maxElectrons: 14 },
        { name: '5d', maxElectrons: 10 },
        { name: '6p', maxElectrons: 6 },
        { name: '7s', maxElectrons: 2 },
        { name: '5f', maxElectrons: 14 },
        { name: '6d', maxElectrons: 10 },
        { name: '7p', maxElectrons: 6 }
    ];

    let remainingElectrons = atomicNumber;
    let configurationArray = [];
    let configartion = '';

    if (elements[atomicNumber].traditional){
        return {configartion:elements[atomicNumber].traditional, configurationArray}
    }

    for (const sublevel of sublevels) {
        if (remainingElectrons > 0) {
            const electronsInSublevel = Math.min(remainingElectrons, sublevel.maxElectrons);
            configurationArray.push({ electronSublevel:sublevel.name , electronsInSublevel }) ;
            remainingElectrons -= electronsInSublevel;
        } else {
            break;
        }
    }
    for(const i of configurationArray){
        configartion+=`${i.electronSublevel}<sup>${i.electronsInSublevel}</sup>`
    }

    return {configartion, configurationArray};
}

function getConfigurationByNearestInertGas(atomicNumber) {
    const inertGases = [
        { number: 2, symbol: "He", config: "[He]", distribution: ['1s'] },
        { number: 10, symbol: "Ne", config: "[Ne]", distribution: ['1s', '2s', '2p'] },
        { number: 18, symbol: "Ar", config: "[Ar]", distribution: ['1s', '2s', '2p', '3s', '3p'] },
        { number: 36, symbol: "Kr", config: "[Kr]", distribution: ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p'] },
        { number: 54, symbol: "Xe", config: "[Xe]", distribution: ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p'] },
        { number: 86, symbol: "Rn", config: "[Rn]", distribution: ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p'] }
    ];
    if (elements[atomicNumber].anomaly){
        return elements[atomicNumber].anomaly
    }

    const nearestGas = inertGases.slice().reverse().find(gas => gas.number < atomicNumber);
    if (!nearestGas) {
        return getTraditionalConfiguration(atomicNumber).configartion;
    }

    const configByInter = getTraditionalConfiguration(atomicNumber).configurationArray.filter(sublevel => 
        !nearestGas.distribution.includes(sublevel.electronSublevel)
    );

    return `${nearestGas.config} ${configByInter.map(sublevel => `${sublevel.electronSublevel}<sup>${sublevel.electronsInSublevel}</sup>`).join('   ')}`;
}


