import google.generativeai as genai

# ✅ Gemini API Key Set Karo
API_KEY="AIzaSyC4G9h8STxQCtsC6ysiXuLgvzNtpRoLPsY"
genai.configure(api_key=API_KEY)

# ✅ Gemini Model Load Karo
model = genai.GenerativeModel("gemini-1.5-flash")

# ✅ Summary Generate Karne Ka Function
def get_summary(text):
    """Gemini API se summary fetch karega"""
    try:
        response = model.generate_content(f"""
            Bhai, mujhe is annual report ka ek **chhota summary** de, 
            lekin ek **desi doston ke liye mazedaar aur sarcastic** tone mein likh. 
            Thoda Hinglish daal, aur aise likh ki lagge koi **funny dost samjha raha ho**. 
            Koi bullet points nahi, bas ek **masta flow wala paragraph** likh jo investor padhte hi maza le.  

            Report:
            {text}
        """)
        print("API Response:", response.text)  # ✅ Debugging ke liye print
        return response.text
    except Exception as e:
        print("Error:", e)
        return "Summary not generated."

# ✅ Test ke liye
test_text = "Apple ka revenue pichle saal se 20% badh gaya. Sales bohot tez chal rahi hai."
summary = get_summary(test_text)
print("Generated Summary:\n", summary)
