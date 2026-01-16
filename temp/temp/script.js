// Configuration
        const MIN_TEMP = 15;
        const MAX_TEMP = 40;
        const GAUGE_MAX = 400.5; // 3/4 of circle circumference

        // DOM elements
        const tempValue = document.getElementById('tempValue');
        const gaugeProgress = document.getElementById('gaugeProgress');
        const fanStatus = document.getElementById('fanStatus');
        const fanSpeed = document.getElementById('fanSpeed');
        const fanIcon = document.getElementById('fanIcon');
        const statusDot = document.getElementById('statusDot');
        const statusText = document.getElementById('statusText');
        const minTemp = document.getElementById('minTemp');
        const maxTemp = document.getElementById('maxTemp');

        // State
        let currentTemp = 24;
        let recordedMin = 24;
        let recordedMax = 24;

        // Update gauge
        function updateGauge(temp) {
            const percentage = Math.min(Math.max((temp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP), 0), 1);
            const offset = 534 - (GAUGE_MAX * percentage);
            gaugeProgress.style.strokeDashoffset = offset;
        }

        // Update fan status based on temperature
        function updateFanStatus(temp) {
            if (temp < 22) {
                fanStatus.textContent = 'FAN OFF';
                fanSpeed.textContent = 'Standby Mode';
                fanIcon.classList.remove('spinning');
                statusDot.className = 'status-dot normal';
                statusText.textContent = 'System Normal';
            } else if (temp >= 22 && temp < 27) {
                fanStatus.textContent = 'FAN ON';
                fanSpeed.textContent = 'Speed: Low';
                fanIcon.classList.add('spinning');
                statusDot.className = 'status-dot normal';
                statusText.textContent = 'System Normal';
            } else if (temp >= 27 && temp < 32) {
                fanStatus.textContent = 'FAN ON';
                fanSpeed.textContent = 'Speed: Medium';
                fanIcon.classList.add('spinning');
                statusDot.className = 'status-dot warm';
                statusText.textContent = 'Temperature Elevated';
            } else {
                fanStatus.textContent = 'FAN ON';
                fanSpeed.textContent = 'Speed: High';
                fanIcon.classList.add('spinning');
                statusDot.className = 'status-dot hot';
                statusText.textContent = 'High Temperature Alert';
            }
        }

        // Update temperature display
        function updateTemperature(temp) {
            currentTemp = temp;
            tempValue.textContent = Math.round(temp);
            updateGauge(temp);
            updateFanStatus(temp);
            
            // Update min/max
            if (temp < recordedMin) {
                recordedMin = temp;
                minTemp.textContent = Math.round(temp) + '°C';
            }
            if (temp > recordedMax) {
                recordedMax = temp;
                maxTemp.textContent = Math.round(temp) + '°C';
            }
        }

        // Simulate real-time temperature changes
        function simulateTemperature() {
            // Random walk simulation
            const change = (Math.random() - 0.5) * 0.8;
            const newTemp = Math.min(Math.max(currentTemp + change, MIN_TEMP), MAX_TEMP);
            updateTemperature(newTemp);
        }

        // Initialize
        updateTemperature(currentTemp);

        // Simulate temperature updates every 2 seconds
        setInterval(simulateTemperature, 2000);

        // Optional: Add click to manually adjust temperature (for demo)
        document.querySelector('.gauge-container').addEventListener('click', () => {
            const randomTemp = MIN_TEMP + Math.random() * (MAX_TEMP - MIN_TEMP);
            updateTemperature(randomTemp);
        });