import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import styles from './Forecast.module.css';

function Forecast(props) {
  const { data } = props;
  const WEEK_DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const currentDay = new Date().getDay();
  const forcastDays = WEEK_DAYS.slice(currentDay, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, currentDay)
  );
  return (
    <>
      <div className={styles.title}>Daily</div>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 6).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className={styles.dailyItem}>
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    alt="weather"
                    className={styles.iconSmall}
                  />
                  <label className={styles.day}>{forcastDays[index]}</label>
                  <label className={styles.description}>
                    {item.weather[0].description}
                  </label>
                  <label className={styles.minMax}>
                    {Math.round(item.main.temp_min)}°C -{' '}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className={styles.dailyDetailsGrid}>
                <div className={styles.dailyDetailsGridItem}>
                  <label className={styles.dailyDetailsLabel}>Pressure</label>
                  <label
                    className={styles.dailyDetailsValue}
                  >{`${item.main.pressure}hPa`}</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label className={styles.dailyDetailsLabel}>Humidity</label>
                  <label
                    className={styles.dailyDetailsValue}
                  >{`${item.main.humidity}%`}</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label className={styles.dailyDetailsLabel}>Clouds</label>
                  <label
                    className={styles.dailyDetailsValue}
                  >{`${item.clouds.all}%`}</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label className={styles.dailyDetailsLabel}>Wind</label>
                  <label
                    className={styles.dailyDetailsValue}
                  >{`${item.wind.speed}m/s`}</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label className={styles.dailyDetailsLabel}>Sea Level</label>
                  <label
                    className={styles.dailyDetailsValue}
                  >{`${item.main.sea_level}m`}</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label className={styles.dailyDetailsLabel}>Feels Like</label>
                  <label className={styles.dailyDetailsValue}>{`${Math.round(
                    item.main.feels_like
                  )}°C`}</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default Forecast;
