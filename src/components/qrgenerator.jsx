import React, { useState , useRef} from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
    const [text, setText] = useState('Enter Text or URL');
    const [qrCodeUrl, setQrCodeUrl] = useState(' ');
    // adding logo and color
    const [logo, setlogo] = useState(null);
    const canvasRef = useRef(null);
    //size and download option
    const [size, setSize] = useState(256); //default size


    //logo handleing
    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setlogo(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //handling QRCode download
    //Download option
        const downloadQRCode = () => {
            const link = document.createElement('a');
            link.href = qrCodeUrl;
            link.download = 'qrcode.png';
            link.click();
        };

    const generateQRCode = async () => {

        try {
            const canvas = canvasRef.current;
            //increasing resolution for canvas
            const scale = 2.7;
            canvas.width = size * scale;
            canvas.height = size * scale;
            await QRCode.toCanvas(canvas, text, {
                width: size * scale,
                margin: 0.5,
                color: {
                    dark: '#000000', //color for Qrcode
                    light: '#ffffff' //Background Color
                },
            });
            
            if (logo) {
                const ctx = canvas.getContext('2d'); //setting the context for the canvas as 2d --> 2Dimensional
                const logoImage = new Image();
                logoImage.src = logo;
                logoImage.onload = () => {
                    const logoSize = canvas.width * 0.2; //Size of the Logo
                    const x = (canvas.width - logoSize) / 2;
                    const y = (canvas.height - logoSize) / 2;
                    ctx.drawImage(logoImage, x, y, logoSize, logoSize);
                    setQrCodeUrl(canvas.toDataURL());
                };
            } else {
                setQrCodeUrl(canvas.toDataURL());
            }
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div>
            <h1>
                QR Code Generator
            </h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter Text or URL"
            />
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
            <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                placeholder='Enter Size'
                min="100"
                max="1000"
            />
            <button onClick={generateQRCode} >Generate QR Code</button>
            {qrCodeUrl && (<div>
                <img src={qrCodeUrl} alt="Generated QR Code" style={{width:size,  height:size}}/>
                <button onClick={downloadQRCode}> Download QR Code </button>
            </div>
            )}
            <canvas ref={canvasRef} style={{display:'none'}}/>
        </div>
    );
};

export default QRCodeGenerator;