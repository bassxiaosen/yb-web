import React, { Component } from 'react';
import styles from './styles.less';
import { Spin } from "antd"
export default class HistorySider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { historyData, handleClickSiderHistory, loading } = this.props;

    return (
      <>
        <Spin spinning={loading}>
          <ul className={styles.historyList}>
            {
              Object.keys(historyData).sort((a, b) => (new Date(b) - new Date(a))).map((item, index) => (
                <li
                  key={item}
                >
                  <div className={styles.dateRate}>
                    <span className={styles.dateColor}>{item}</span>
                    <span>{historyData[item].length}次签到</span>
                  </div>
                  <ul className={styles.detailDataList}>
                    {
                      historyData[item].map((innerItem, innerIndex) => (
                        <li
                          onClick={() => {
                            handleClickSiderHistory(innerItem.sectionId, innerItem.attendanceCount, innerItem.attendanceRate, `${innerItem.date} ${innerItem.time}`);
                          }}
                          key={innerItem.sectionId}
                        >
                          <span>{innerItem.time}</span>
                          <span>{`${innerItem.attendanceCount}(${innerItem.attendanceRate})%`}</span>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
            {/* {historyData.map(dateCountObj => {
              const { data } = dateCountObj;
              return (
                <li
                  key={dateCountObj.sectionId}
                  onClick={() => {
                    handleClickSiderHistory(dateCountObj.sectionId, dateCountObj.attendanceCount, dateCountObj.attendanceRate, dateCountObj.time)
                  }}
                >
                  <div className={styles.dateRate}>
                    <span className={styles.dateColor}>{dateCountObj.time}</span>
                    <span className={styles.dateColor}>{dateCountObj.attendanceRate}%</span>
                    <span>{dateCountObj.data.length}次签到</span>
                  </div>
                  <ul className={styles.detailDataList}>
                    {data.map(detailData => {
                      return (
                        <li
                          onClick={() => {
                            handleClickSiderHistory(detailData.checkInId);
                          }}
                          key={detailData.checkInId}
                        >
                          <span>{detailData.time}</span>
                          <span>{`${detailData.checkInNum}(${detailData.rate})`}</span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })} */}
          </ul>
        </Spin>

        {/* <ul className={styles.historyList}>
          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>

          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>

          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>
          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>
          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>
          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>
          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>
          <li>
            <div className={styles.dateRate}>
              <span className={styles.dateColor}>2019-01-24</span>
              <span>1次签到</span>
            </div>
            <ul className={styles.detailDataList}>
              <li>
                <span>10:33</span>
                <span>60(100%)</span>
              </li>
              <li>
                <span>14:33</span>
                <span>30(50%)</span>
              </li>
            </ul>
          </li>
        </ul> */}
      </>
    );
  }
}
