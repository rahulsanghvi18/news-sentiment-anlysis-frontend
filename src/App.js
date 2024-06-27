import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Select from 'react-select';
import { FaSort, FaCalendarAlt } from 'react-icons/fa';
import { Button, Row, Col } from 'react-bootstrap';
import D3Chart from './D3Chart';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #121212;
    color: #ffffff;
    font-family: 'Roboto', sans-serif;
  }
`;

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f1f1f;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 24px;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #1f1f1f;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  background-color: #292929;
  color: white;
  border-color: #6c757d;
  border-radius: 10px;
  padding: 5px;
  margin: 0 10px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 10px;
  color: white;
`;

const SortButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  background-color: #292929;
  border-color: #6c757d;
  &:hover {
    background-color: #373737;
    border-color: #6c757d;
  }
`;

const Content = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Sidebar = styled.div`
  width: 30%;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #1f1f1f;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const NewsItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #292929;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #373737;
  }
`;

const NewsDetails = styled.div`
  width: 70%;
  background-color: #1f1f1f;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const NewsTitle = styled.h4`
  margin-bottom: 10px;
`;

const NewsTime = styled.p`
  color: #b0b0b0;
`;

const NewsContent = styled.p`
  margin-bottom: 10px;
`;

const NewsStocks = styled.div`
  margin-top: 20px;
`;

const StockButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${props => props.weight > 0 ? '#4CAF50' : props.weight < 0 ? '#F44336' : '#9E9E9E'};
  border-color: ${props => props.weight > 0 ? '#4CAF50' : props.weight < 0 ? '#F44336' : '#9E9E9E'};
`;

const StockDetails = styled.div`
  margin-top: 20px;
  background-color: #292929;
  padding: 20px;
  border-radius: 10px;
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#292929',
    color: 'white',
    borderColor: '#6c757d',
    borderRadius: '10px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#292929',
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#6c757d',
  }),
};

const CenteredSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const DropdownContainer = styled.div`
  width: 50%; /* Set the width to half the page */
`;

const App = () => {
  const [selectedFund, setSelectedFund] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');

  const funds = [
    { value: 'Fund A', label: 'Fund A' },
    { value: 'Fund B', label: 'Fund B' },
    { value: 'Fund C', label: 'Fund C' },
    { value: 'Fund D', label: 'Fund D' },
    { value: 'Fund E', label: 'Fund E' },
  ];

  const fundStocks = {
    'Fund A': ['AAPL', 'GOOGL'],
    'Fund B': ['MSFT', 'AMZN'],
    'Fund C': ['JNJ', 'PFE'],
    'Fund D': ['XOM', 'CVX'],
    'Fund E': ['JPM', 'BAC'],
  };

  const newsList = [
    {
      title: 'Market rallies on economic data',
      time: '10:00 AM, 2024-06-25',
      details: 'Full news content here...',
      stocks: [
        { name: 'AAPL', sentiment: 7, weight: 0.05, prices: { current: 150, nextHour: 151, nextDay: 155, nextWeek: 160 } },
        { name: 'GOOGL', sentiment: 8, weight: -0.06, prices: { current: 2500, nextHour: 2502, nextDay: 2510, nextWeek: 2520 } },
      ],
    },
    {
      title: 'Tech stocks soar',
      time: '11:00 AM, 2024-06-25',
      details: 'Full news content here...',
      stocks: [
        { name: 'MSFT', sentiment: 9, weight: 0.07, prices: { current: 300, nextHour: 301, nextDay: 305, nextWeek: 310 } },
        { name: 'AMZN', sentiment: 6, weight: 0.08, prices: { current: 3400, nextHour: 3405, nextDay: 3420, nextWeek: 3450 } },
      ],
    },
    // Add similar objects for other news items
  ];

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filterByDateRange = (news) => {
    const newsDate = new Date(news.time.split(', ')[1]);
    const fromDate = filterFromDate ? new Date(filterFromDate) : new Date('1900-01-01');
    const toDate = filterToDate ? new Date(filterToDate) : new Date();
    return newsDate >= fromDate && newsDate <= toDate;
  };

  const filterByFund = (news) => {
    if (!selectedFund) return true;
    const stocksInFund = fundStocks[selectedFund.value] || [];
    return news.stocks.some(stock => stocksInFund.includes(stock.name));
  };

  const filteredNewsList = newsList
    .filter(filterByFund)
    .filter(filterByDateRange)
    .sort((a, b) => {
      const dateA = new Date(a.time.split(', ')[1]);
      const dateB = new Date(b.time.split(', ')[1]);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const getStockPriceData = (stock) => {
    const newsDate = new Date(selectedNews.time);
    return [
      { date: newsDate.toISOString(), price: stock.prices.current },
      { date: new Date(newsDate.getTime() + 60 * 60 * 1000).toISOString(), price: stock.prices.nextHour },
      { date: new Date(newsDate.getTime() + 24 * 60 * 60 * 1000).toISOString(), price: stock.prices.nextDay },
      { date: new Date(newsDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), price: stock.prices.nextWeek },
    ];
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>News Sentiment Analysis</Title>
        </Header>
        <CenteredSelectContainer>
          <DropdownContainer>
            <Select
              styles={customStyles}
              placeholder="Select a fund"
              options={funds}
              onChange={setSelectedFund}
              isSearchable
            />
          </DropdownContainer>
        </CenteredSelectContainer>
        <Content>
          <Sidebar>
            <ControlsContainer>
              <Label><FaCalendarAlt style={{ color: 'white' }} /> From:</Label>
              <DateInput 
                type="date"
                value={filterFromDate}
                onChange={(e) => setFilterFromDate(e.target.value)}
              />
              <Label><FaCalendarAlt style={{ color: 'white' }} /> To:</Label>
              <DateInput 
                type="date"
                value={filterToDate}
                onChange={(e) => setFilterToDate(e.target.value)}
              />
              <SortButton onClick={toggleSortOrder}>
                <FaSort style={{ color: 'white' }} />
              </SortButton>
            </ControlsContainer>
            {filteredNewsList.map((news, index) => (
              <NewsItem key={index} onClick={() => { setSelectedNews(news); setSelectedStock(null); }}>
                <strong>{news.title}</strong> <br /> <small>{news.time}</small>
              </NewsItem>
            ))}
          </Sidebar>
          <NewsDetails>
            {selectedNews ? (
              <>
                <NewsTitle>{selectedNews.title}</NewsTitle>
                <NewsTime>{selectedNews.time}</NewsTime>
                <NewsContent>{selectedNews.details}</NewsContent>
                <NewsStocks>
                  <strong>Affected Stocks:</strong>
                  {selectedNews.stocks
                    .sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight))
                    .map((stock, index) => (
                      <StockButton
                        key={index}
                        variant="secondary"
                        weight={stock.weight}
                        onClick={() => setSelectedStock(stock)}
                      >
                        {stock.name} ({stock.weight > 0 ? '+' : ''}{stock.weight})
                      </StockButton>
                    ))}
                </NewsStocks>
                {selectedStock && (
                  <StockDetails>
                    <p><strong>Stock Name:</strong> {selectedStock.name}</p>
                    <p><strong>Sentiment Score:</strong> {selectedStock.sentiment}</p>
                    <p><strong>Portfolio Active Weight:</strong> {selectedStock.weight}</p>
                    <D3Chart data={getStockPriceData(selectedStock)} />
                  </StockDetails>
                )}
              </>
            ) : (
              <p>Select a news item to see details</p>
            )}
          </NewsDetails>
        </Content>
      </Container>
    </>
  );
};

export default App;
