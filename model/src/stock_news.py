class StockNews:
    """
    Represents a stock news article.
    """
    def __init__(self, title, link, ticker, full_text=None):
        """
        Initializes a StockNews object.

        Args:
            title (str): The headline of the news article.
            link (str): The URL to the full article.
            ticker (str): The stock ticker symbol the article is related to.
            full_text (str, optional): The full text content of the article. Defaults to None.
        """
        self.title = title
        self.link = link
        self.ticker = ticker
        self.full_text = full_text

    def __repr__(self):
        return f"StockNews(title='{self.title}', link='{self.link}', ticker='{self.ticker}', full_text='{self.full_text[:50]}...')"

    def __str__(self):
        return f"Title: {self.title}\nLink: {self.link}\nTicker: {self.ticker}\nFull Text: {self.full_text[:200]}..."