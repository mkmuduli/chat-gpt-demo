

const engineId = 'stable-diffusion-v1-5';
const apiHost = 'https://api.stability.ai';



function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;

    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}

const addBase64Prefix = (str) => {
    return `data:image/png;base64, ${str}`
}

const base64ToUrl = (dataStr) => {
    var blob = dataURItoBlob(addBase64Prefix(dataStr));
    return URL.createObjectURL(blob);

}


export const fetchImages = async (prompt, apiKey, numImage = 1) => {
    const response = await fetch(
        `${apiHost}/v1/generation/${engineId}/text-to-image`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                        text: prompt,
                        "weight": 0.5
                    },
                ],
                cfg_scale: 7,
                height: 512,
                width: 512,
                samples: numImage,
                steps: 30,
                style_preset: '3d-model',
                seed: 100,
            }),
        }
    )

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
    }



    const { artifacts } = await response.json();
    const list = artifacts.map(eachImage=>{
            return {
              url: base64ToUrl(eachImage.base64)
            }
          })
    return list;
}

export const fetchImagesFromDALLE = async (prompt, apiKey, numImage = 1) => {
    const response = await fetch(
        `https://api.openai.com/v1/images/generations`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                n: numImage,
                size: '512x512'
            }),
        }
    )

    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`)
    }



    const { data } = await response.json()
    return data;
}






