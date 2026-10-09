import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App, { backgroundQueries } from './App';
const weather = { name: 'Stockholm', sys: { country: 'SE' }, main: { temp: 7, feels_like: 3, humidity: 90, temp_max: 8, temp_min: 6 }, weather: [{ main: 'Rain', icon: '10d', description: 'rain' }], wind: { speed: 4 } };
beforeEach(() => {
  process.env.REACT_APP_WEATHER_API_KEY = 'test-key';
  delete process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => weather });
});
test('loads weather for device coordinates when permission is granted', async () => {
  Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition: jest.fn(ok => ok({ coords: { latitude: 59.3, longitude: 18.1 } })) } });
  render(<App />);
  await waitFor(() => expect(fetch).toHaveBeenCalled());
  const url = new URL(fetch.mock.calls[0][0]);
  expect(url.searchParams.get('lat')).toBe('59.3');
  expect(url.searchParams.get('lon')).toBe('18.1');
  expect(await screen.findByText(/Stockholm/)).toBeInTheDocument();
});
test('a city search wins over a late device location callback', async () => {
  let locationSuccess;
  Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition: jest.fn(ok => { locationSuccess = ok; }) } });
  render(<App />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Paris' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search', exact: true }));
  locationSuccess({ coords: { latitude: 59.3, longitude: 18.1 } });
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  expect(new URL(fetch.mock.calls[0][0]).searchParams.get('q')).toBe('Paris');
});
test('image queries keep city, landmark, weather and temperature context', () => {
  expect(backgroundQueries(weather)[0]).toBe('Stockholm landmark rain cold');
  expect(backgroundQueries({ ...weather, main: { temp: -4 }, weather: [{ main: 'Snow' }] })[0]).toContain('winter snow');
  expect(backgroundQueries(weather)[2]).toBe('Stockholm landmark');
});
