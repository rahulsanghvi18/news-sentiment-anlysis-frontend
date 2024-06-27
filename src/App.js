import React, { useState, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Select from 'react-select';
import { FaSort, FaCalendarAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import PieChart from './PieChart';
import D3Chart from './D3Chart';

const newsList = [
  {
    title: 'Apple announces new iPhone model',
    time: '2024-06-25T10:30:00',
    details: 'Apple Inc. has unveiled its latest iPhone model, featuring breakthrough AI capabilities and extended battery life.',
    stocks: [
      {
        name: 'AAPL',
        sentiment: 8,
        portfolioImpact: 0.02,
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
        portfolioImpact: 0.03,
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
        portfolioImpact: 0.04,
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
        portfolioImpact: 0.05,
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
  background-color: ${props => props.activeWeight > 0 ? '#4CAF50' : props.activeWeight < 0 ? '#F44336' : '#9E9E9E'};
  border-color: ${props => props.activeWeight > 0 ? '#4CAF50' : props.activeWeight < 0 ? '#F44336' : '#9E9E9E'};
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

const PieChartContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  padding: 20px 0;
  height: 25vh; /* Set the height to 25% of the viewport height */
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
      { name: 'AAPL', weight: 0.15, activeWeight: 0.05 },
      { name: 'GOOGL', weight: 0.25, activeWeight: -0.02 },
    ],
    'Fund B': [
      { name: 'MSFT', weight: 0.30, activeWeight: 0.07 },
      { name: 'AMZN', weight: 0.10, activeWeight: -0.01 },
    ],
    'Fund C': [
      { name: 'TSLA', weight: 0.20, activeWeight: 0.03 },
      { name: 'NVDA', weight: 0.05, activeWeight: -0.04 },
    ],
  };

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

  const getWeight = (stockName) => {
    if (!selectedFund) return 0;
    const stock = fundStocks[selectedFund.value].find(s => s.name === stockName);
    return stock ? stock.weight : 0;
  };

  const getActiveWeight = (stockName) => {
    if (!selectedFund) return 0;
    const stock = fundStocks[selectedFund.value].find(s => s.name === stockName);
    return stock ? stock.activeWeight : 0;
  };

  const getPortfolioImpact = (stockName) => {
    if (!selectedNews) return 0;
    const stock = selectedNews.stocks.find(s => s.name === stockName);
    return stock ? stock.portfolioImpact : 0;
  };

  const filteredNewsList = selectedFund ? newsList
    .filter(filterByFund)
    .filter(filterByDateRange)
    .sort((a, b) => {
      const dateA = new Date(a.time);
      const dateB = new Date(b.time);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }) : [];

  const pieChartData = useMemo(() => {
    return selectedFund ? {
      labels: fundStocks[selectedFund.value].map(stock => stock.name),
      datasets: [{
        data: fundStocks[selectedFund.value].map(stock => stock.weight),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    } : {};
  }, [selectedFund]);

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
              onChange={(selectedOption) => {
                setSelectedFund(selectedOption);
                setSelectedNews(null); // Clear selected news
              }}
              isSearchable
            />
          </DropdownContainer>
        </CenteredSelectContainer>
        {selectedFund && (
          <PieChartContainer>
            <PieChart data={pieChartData} style={{maxHeight: '100vh', maxWidth: '100vw'}} />
          </PieChartContainer>
        )}
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
                    .sort((a, b) => Math.abs(getActiveWeight(b.name)) - Math.abs(getActiveWeight(a.name)))
                    .map((stock, index) => (
                      <StockButton
                        key={index}
                        variant="secondary"
                        activeWeight={getActiveWeight(stock.name)}
                        onClick={() => setSelectedStock(stock)}
                      >
                        {stock.name} ({getWeight(stock.name)} Weight, {getActiveWeight(stock.name) > 0 ? '+' : ''}{getActiveWeight(stock.name)} Active Weight)
                      </StockButton>
                    ))}
                </NewsStocks>
                {selectedStock && (
                <StockDetails>
                  <p><strong>Stock Name:</strong> {selectedStock.name}</p>
                  <p><strong>Sentiment Score:</strong> {selectedStock.sentiment}</p>
                  <p><strong>Portfolio Weight:</strong> {getWeight(selectedStock.name)}</p>
                  <p><strong>Portfolio Active Weight:</strong> {getActiveWeight(selectedStock.name)}</p>
                  <p><strong>Portfolio Impact:</strong> {getPortfolioImpact(selectedStock.name)}</p>
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
