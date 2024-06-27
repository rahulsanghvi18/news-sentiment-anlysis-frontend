import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Select from 'react-select';
import { FaSort, FaCalendarAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import D3Chart from './D3Chart';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f2f5;
    color: #333;
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
  background-color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  background-color: #ffffff;
  color: #333;
  border-color: #d0d0d0;
  border-radius: 10px;
  padding: 5px;
  margin: 0 10px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 10px;
  color: #333;
`;

const SortButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  background-color: #ffffff;
  border-color: #d0d0d0;
  &:hover {
    background-color: #e0e0e0;
    border-color: #d0d0d0;
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
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const NewsItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f0f2f5;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const NewsDetails = styled.div`
  width: 70%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const NewsTitle = styled.h4`
  margin-bottom: 10px;
`;

const NewsTime = styled.p`
  color: #777;
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
  background-color: #f0f2f5;
  padding: 20px;
  border-radius: 10px;
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#ffffff',
    color: '#333',
    borderColor: '#d0d0d0',
    borderRadius: '10px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#ffffff',
    color: '#333',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
  }),
  input: (provided) => ({
    ...provided,
    color: '#333',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#777',
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
  ];

  const fundStocks = {
    'Fund A': [
      { name: 'AAPL', weight: 0.05 },
      { name: 'GOOGL', weight: -0.02 },
    ],
    'Fund B': [
      { name: 'MSFT', weight: 0.07 },
      { name: 'AMZN', weight: -0.01 },
    ],
    'Fund C': [
      { name: 'TSLA', weight: 0.03 },
      { name: 'NVDA', weight: -0.04 },
    ],
  };

  const newsList = [
    {
      title: 'Apple announces new iPhone model',
      time: '2024-06-25T10:30:00',
      details: 'Apple Inc. has unveiled its latest iPhone model, featuring breakthrough AI capabilities and extended battery life.',
      stocks: [
        {
          name: 'AAPL',
          sentiment: 8,
          prices: {
            historical: [
              { date: '2024-06-25T09:30:00', price: 185.21 },
              { date: '2024-06-25T09:45:00', price: 185.68 },
              { date: '2024-06-25T10:00:00', price: 186.03 },
              { date: '2024-06-25T10:15:00', price: 185.89 },
              { date: '2024-06-25T10:30:00', price: 186.75 },
            ],
            predictions: [
              { date: '2024-06-25T11:30:00', price: 188.20 },
              { date: '2024-06-26T10:30:00', price: 190.50 },
              { date: '2024-06-28T10:30:00', price: 192.75 },
            ]
          }
        },
        {
          name: 'GOOGL',
          sentiment: 6,
          prices: {
            historical: [
              { date: '2024-06-19T09:30:00', price: 123.45 },
              { date: '2024-06-19T10:30:00', price: 123.45 },
              { date: '2024-06-19T11:30:00', price: 123.45 },
              { date: '2024-06-19T12:30:00', price: 123.45 },
              { date: '2024-06-19T13:30:00', price: 123.45 },
              { date: '2024-06-19T14:30:00', price: 123.45 },
              { date: '2024-06-19T15:30:00', price: 123.45 },
              { date: '2024-06-20T09:45:00', price: 123.78 },
              { date: '2024-06-21T10:00:00', price: 124.01 },
              { date: '2024-06-22T10:15:00', price: 123.89 },
              { date: '2024-06-23T10:30:00', price: 123.56 },
            ],
            predictions: [
              { date: '2024-06-25T11:30:00', price: 123.20 },
              { date: '2024-06-26T10:30:00', price: 122.80 },
              { date: '2024-06-28T10:30:00', price: 122.50 },
            ]
          }
        },
      ],
    },
    {
      title: 'Microsoft releases new AI tool for developers',
      time: '2024-06-25T11:45:00',
      details: 'Microsoft has launched a powerful new AI development toolkit, aiming to simplify machine learning integration for developers.',
      stocks: [
        {
          name: 'MSFT',
          sentiment: 9,
          prices: {
            historical: [
              { date: '2024-06-25T10:45:00', price: 335.67 },
              { date: '2024-06-25T11:00:00', price: 336.12 },
              { date: '2024-06-25T11:15:00', price: 336.45 },
              { date: '2024-06-25T11:30:00', price: 336.78 },
              { date: '2024-06-25T11:45:00', price: 338.20 },
            ],
            predictions: [
              { date: '2024-06-25T12:45:00', price: 340.50 },
              { date: '2024-06-26T11:45:00', price: 342.75 },
              { date: '2024-06-28T11:45:00', price: 345.00 },
            ]
          }
        },
        {
          name: 'AMZN',
          sentiment: 5,
          prices: {
            historical: [
              { date: '2024-06-25T10:45:00', price: 130.56 },
              { date: '2024-06-25T11:00:00', price: 130.78 },
              { date: '2024-06-25T11:15:00', price: 130.92 },
              { date: '2024-06-25T11:30:00', price: 130.85 },
              { date: '2024-06-25T11:45:00', price: 130.70 },
            ],
            predictions: [
              { date: '2024-06-25T12:45:00', price: 130.50 },
              { date: '2024-06-26T11:45:00', price: 130.25 },
              { date: '2024-06-28T11:45:00', price: 129.90 },
            ]
          }
        },
      ],
    },
  ];

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filterByDateRange = (news) => {
    const newsDate = new Date(news.time);
    const fromDate = filterFromDate ? new Date(filterFromDate) : new Date('1900-01-01');
    const toDate = filterToDate ? new Date(filterToDate) : new Date();
    return newsDate >= fromDate && newsDate <= toDate;
  };

  const filterByFund = (news) => {
    if (!selectedFund) return false; // No fund selected, show no news
    const stocksInFund = fundStocks[selectedFund.value] || [];
    return news.stocks.some(stock => stocksInFund.map(fundStock => fundStock.name).includes(stock.name));
  };

  const getStockWeight = (stockName) => {
    if (!selectedFund) return 0;
    const stock = fundStocks[selectedFund.value].find(s => s.name === stockName);
    return stock ? stock.weight : 0;
  };

  const filteredNewsList = selectedFund ? newsList
    .filter(filterByFund)
    .filter(filterByDateRange)
    .sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }) : [];

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
              <Label><FaCalendarAlt style={{ color: '#007bff' }} /> From:</Label>
              <DateInput 
                type="date"
                value={filterFromDate}
                onChange={(e) => setFilterFromDate(e.target.value)}
              />
              <Label><FaCalendarAlt style={{ color: '#007bff' }} /> To:</Label>
              <DateInput 
                type="date"
                value={filterToDate}
                onChange={(e) => setFilterToDate(e.target.value)}
              />
              <SortButton onClick={toggleSortOrder}>
                <FaSort />
              </SortButton>
            </ControlsContainer>
            {filteredNewsList.map((news, index) => (
              <NewsItem key={index} onClick={() => { setSelectedNews(news); setSelectedStock(null); }}>
                <strong>{news.title}</strong> <br /> <small>{new Date(news.time).toLocaleString()}</small>
              </NewsItem>
            ))}
          </Sidebar>
          <NewsDetails>
            {selectedNews ? (
              <>
                <NewsTitle>{selectedNews.title}</NewsTitle>
                <NewsTime>{new Date(selectedNews.time).toLocaleString()}</NewsTime>
                <NewsContent>{selectedNews.details}</NewsContent>
                <NewsStocks>
                  <strong>Affected Stocks:</strong>
                  {selectedNews.stocks
                    .sort((a, b) => Math.abs(getStockWeight(b.name)) - Math.abs(getStockWeight(a.name)))
                    .map((stock, index) => (
                      <StockButton
                        key={index}
                        variant="secondary"
                        weight={getStockWeight(stock.name)}
                        onClick={() => setSelectedStock(stock)}
                      >
                        {stock.name} ({getStockWeight(stock.name) > 0 ? '+' : ''}{getStockWeight(stock.name)})
                      </StockButton>
                    ))}
                </NewsStocks>
                {selectedStock && (
                <StockDetails>
                  <p><strong>Stock Name:</strong> {selectedStock.name}</p>
                  <p><strong>Sentiment Score:</strong> {selectedStock.sentiment}</p>
                  <p><strong>Portfolio Active Weight:</strong> {getStockWeight(selectedStock.name)}</p>
                  <D3Chart 
                    data={selectedStock.prices.historical}
                    predictions={selectedStock.prices.predictions}
                    newsTime={selectedNews.time}
                  />
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
