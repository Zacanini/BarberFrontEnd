"use client";

export default function Container({ imgSrc, title, description }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', padding: '20px', boxSizing: 'border-box' }}>

            <div style={{ display: 'flex', backgroundColor: '#daa520', padding: '20px', boxSizing: 'border-box', alignItems: 'center', maxWidth: 'calc(100% - 100px)', margin: '0 50px',marginRight:'90px' }}>
                
                <div style={{ flex: '0 0 auto', padding: '20px' }}>
                    <img src={imgSrc} alt="Imagem" style={{ width: '300px', height: 'auto' }} />
                </div>
                
                <div style={{ backgroundColor: '#000', borderRadius: '5px', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h1 style={{ textTransform: 'uppercase' }}>{title}</h1>
                    <p style={{ fontSize: '22px', textTransform: 'uppercase' }} dangerouslySetInnerHTML={{ __html: description }}></p>
                </div>
            </div>
        </div>
    );
}