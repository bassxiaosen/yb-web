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
            {historyData.map(dateCountObj => {
              const { data } = dateCountObj;
              return (
                <li key={dateCountObj.id}>
                  <div className={styles.dateRate}>
                    <span className={styles.dateColor}>{dateCountObj.date}</span>
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
            })}
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
