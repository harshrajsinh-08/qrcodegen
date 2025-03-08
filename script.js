let qrcode = null;

function generateQRCode() {
    const websiteInput = document.getElementById('website-input');
    const qrcodeContainer = document.getElementById('qrcode');
    const errorMessage = document.getElementById('error-message');
    const downloadBtn = document.getElementById('download-btn');
    const generateBtn = document.querySelector('.buttons-container button:first-child');
    const url = websiteInput.value.trim();
    
    qrcodeContainer.innerHTML = '';
    errorMessage.style.display = 'none';
    downloadBtn.style.display = 'none';
    try {
        new URL(url);
    } catch (e) {
        errorMessage.style.display = 'block';
        return;
    }
    try {
        qrcode = new QRCode(qrcodeContainer, {
            text: url,
            width: 256,
            height: 256,
            colorDark: "#333333",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        downloadBtn.style.display = 'inline-block';
        generateBtn.style.display = 'none';
    } catch (error) {
        console.error('QR Code generation error:', error);
        errorMessage.textContent = 'Error generating QR code';
        errorMessage.style.display = 'block';
    }
}

function downloadQR() {
    const qrImage = document.querySelector('#qrcode img');
    if (qrImage) {
        const url = document.getElementById('website-input').value.trim();
        let filename;
        try {
            filename = `qr-code-${new URL(url).hostname}.png`;
        } catch (e) {
            filename = 'qr-code.png';
        }

        const link = document.createElement('a');
        link.download = filename;
        link.href = qrImage.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

document.getElementById('website-input').addEventListener('input', function() {
    const generateBtn = document.querySelector('.buttons-container button:first-child');
    const downloadBtn = document.getElementById('download-btn');
    generateBtn.style.display = 'inline-block';
    downloadBtn.style.display = 'none';
    document.getElementById('qrcode').innerHTML = '';
});

document.getElementById('website-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateQRCode();
    }
}); 