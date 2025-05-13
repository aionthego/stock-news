import json
from stock_news import StockNews
import os


def parse_news_from_file(file_path="text/2025_05_12_stock_news.json"):
    """
    Reads and parses stock news from a local JSON file and creates StockNews objects.

    Args:
        file_path (str): The path to the JSON file containing news data.
                         Defaults to "text/2025_05_12_stock_news.json".

    Returns:
        list: A list of StockNews objects or an empty list if an error occurs or file not found.
    """
    parsed_news_file = "/home/user/stock-news/model/text/2025_05_12_stock_news.jsonl"
    stock_news_list = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            news_data = json.load(f)
        for ticker in news_data:
            print(ticker)
            for newsset in news_data[ticker]:
                title = newsset.get('title')
                url = newsset.get('url')
                summary = newsset.get('summary')
                stock_news_item = StockNews(title, url, ticker, summary)
                # Prepare data for JSONL
                news_data_jsonl = {
                    "title": title,
                    "url": url,
                    "ticker": ticker,
                    "summary": summary
                }

                # Append to JSONL file
                with open(parsed_news_file, 'a', encoding='utf-8') as outfile:
                    json.dump(news_data_jsonl, outfile)
                    outfile.write('\n')
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from {file_path}")

if __name__ == "__main__":
    stock_news_list = parse_news_from_file("/home/user/stock-news/model/text/stock-news-daily/2025_05_12_stock_news.json")