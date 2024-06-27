import pandas as pd
from bertopic import BERTopic
from sentence_transformers import SentenceTransformer, util

# Define your news data
news_data = {
    "headline": [
        "Tata motors stock price rises due to strong quarterly earnings",
        "Board of UltraTech Cement approves acquisition of 23% stake in India Cements",
        "Tech stocks fall as market faces new regulatory concerns",
        "Healthcare sector sees growth amid new innovations",
        "Financial stocks recover after recent downturn",
        "Energy sector struggles with low oil prices",
        "Retail stocks surge on strong holiday sales",
        "Automotive industry faces challenges with supply chain issues",
        "Banking stocks benefit from interest rate hikes",
        "Fizer report positive drug trial results",
        "Stock market today: India Cements, Indus Towers, PNB among 5 stocks in F&O ban list on June 27",
        "Reliance share price hits lifetime high for second day in a row. Rises 6.50% in three days",
        "Tata Motors says demerger will allow all businesses to unlock potential",
        "Bharti Airtel: The telecom major acquired 97 Megahertz (MHz) spectrum in the 900 MHz, 1800 MHz, and 2100 MHz frequency bands through the auction for ₹6,857 crore",
        "Reliance: In the spectrum auction conducted by the government, Reliance Jio acquired additional spectrum in the 1800 MHz band in West Bengal and Bihar for ₹973.63 crore",
        "JSW Energy gains nearly 4% as its arm sign PPAs for 1,325 MW green power",
        "CSB Bank surge 7% after promoter likely sold 1.7 cr shares via block deal",
        "HDFC Bank: Japan's Mitsubishi UFJ Financial Group (MUFG) is considering sweetening its $1.7 billion offer for a minority stake in HDFC Bank's non-banking unit, a Bloomberg report said on Monday. Both sides are looking to reach an agreement for a 20 percent stake in HDB Financial Services in about a month.",
        "Adani Enterprises: According to a Reuters' report, market regulator Sebi has discovered that twelve offshore funds, which had invested in Adani group companies, had violated disclosure regulations and exceeded investment limits. According to the report, eight of these offshore funds have submitted a written request to the regulator, seeking to resolve the charges by paying a penalty without admitting guilt"
    ]
}

# Convert to DataFrame
df = pd.DataFrame(news_data)

# Initialize BERTopic model
topic_model = BERTopic()

# Fit the model on the data
topics, probs = topic_model.fit_transform(df['headline'])

# Get the topic information
topic_info = topic_model.get_topic_info()
print(topic_info)

# Get detailed topic descriptions
for topic in topic_info.to_dict(orient="records"):
    print(f"Topic {topic['Topic']}: {topic_model.get_topic(topic['Topic'])}")

# Load pre-trained sentence transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Predefined topics and example sentences
predefined_topics = {
    "Earnings": "Company reports strong quarterly earnings",
    "Acquisition": "Company acquires stake in another company",
    "Regulation": "New regulatory concerns affect the market",
    "Innovation": "New innovations drive growth in sector",
    "Recovery": "Stocks recover after recent downturn",
    "Oil Prices": "Energy sector struggles with low oil prices",
    "Sales": "Retail stocks surge on strong sales",
    "Supply Chain": "Industry faces challenges with supply chain issues",
    "Interest Rates": "Banking stocks benefit from interest rate hikes",
    "Drug Trials": "Company reports positive drug trial results"
}

# Encode predefined topics
predefined_embeddings = model.encode(list(predefined_topics.values()))

# Function to classify new headlines
def classify_new_headline(new_headline):
    new_embedding = model.encode([new_headline])
    similarities = util.pytorch_cos_sim(new_embedding, predefined_embeddings)
    best_match = similarities.argmax().item()
    return list(predefined_topics.keys())[best_match]

# Example of classifying a new headline

new_headline = "Fizer launches ne"
classified_topic = classify_new_headline(new_headline)
print(f"New Headline: {new_headline}")
print(f"Classified Topic: {classified_topic}")
