# verify.py
'''
from PIL import Image
import pytesseract
import pandas as pd

# OCR function to extract text from an image
def perform_ocr(image_path):
    try:
        pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'
        text = pytesseract.image_to_string(Image.open(image_path))
        return text
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""

# Example dataset manipulation function
def manipulate_dataset(description, ocr_text, dataset_path):
    # Here, you can add your logic to manipulate the dataset
    # For example, you can create a DataFrame and append the new data
    # This is just a simple example, and you may need to adapt it based on your requirements
    df = pd.read_csv(dataset_path)
    new_data = {'Description': [description], 'OCR_Text': [ocr_text]}
    new_df = pd.DataFrame(new_data)
    updated_dataset = pd.concat([df, new_df], ignore_index=True)
    updated_dataset.to_csv(dataset_path, index=False)
'''
import json
import pickle
import requests

def verifyInvoice(file_name):
    url = "https://ocr.asprise.com/api/v1/receipt"
    imag = 'static/uploads/'+file_name
    receipt = []
    res = requests.post(url,
                        data= {
                            'api_Key': 'TEST',
                            'recognizer': 'auto',
                            'ref_no' : 'oct_python_123'
                        },
                        files = {
                            'file': open(imag, 'rb')
                        })
#    with open("response1.json","w") as f:
#        json.dump(json.loads(res.text), f)

    with open("response1.json","r") as f:
        data = json.load(f)
        receipt = data['receipts']
        if data['success'] == True:
            receipt = data['receipts'][0]['items']
            print(receipt)
            return receipt
    return receipt

    
                        

