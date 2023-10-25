/* eslint-disable default-case */
import Nav from "../Header/Nav";
import lifeStyleAndDailyExperience from '../../assets/topic_icons/lifestyleAndDailyExperience.png';
import healthAndWellness from '../../assets/topic_icons/healthAndWellness.png';
import financeAndMoney from '../../assets/topic_icons/financeAndMoney.png';
import inspirationAndMotivation from '../../assets/topic_icons/inspirationAndMotivation.png';
import travelAndAdventure from '../../assets/topic_icons/travelAndAdventure.png';
import artAndCreativity from '../../assets/topic_icons/artAndCreativity.png';
import relationshipsAndDating from '../../assets/topic_icons/relationshipsAndDating.png';
import hobbiesAndInterests from '../../assets/topic_icons/hobbiesAndInterests.png'
import homeAndDiy from '../../assets/topic_icons/homeAndDiy.png';
import politicsAndReligion from '../../assets/topic_icons/politicsAndReligion.png';
import technologyAndGadgets from '../../assets/topic_icons/technologyAndGadgets.png';
import careerAndProfessionalLife from '../../assets/topic_icons/careerAndProfessionalLife.png';
import entertainmentAndPopCulture from '../../assets/topic_icons/entertainmentAndPopCulture.png';
import sportsAndFitness from '../../assets/topic_icons/sportsAndFitness.png';
import communityAndSocialCauses from '../../assets/topic_icons/communityAndSocialCauses.png';
import foodAndCooking from '../../assets/topic_icons/foodAndCooking.png';
import parentingAndFamily from '../../assets/topic_icons/parentingAndFamily.png';
import educationAndLearning from '../../assets/topic_icons/educationAndLearning.png';
import fictionAndCreativeWriting from '../../assets/topic_icons/fictionAndCreativeWriting.png';
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getTopics } from '../../utils/api';

function Topics() {
    const navigate = useNavigate(); 
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics().then((topicsFromAPI) => {
            setTopics(topicsFromAPI);
        });
    }, []);
    return (
        <div>
            <Header />
            <Nav selectedItem={'all topics'} />
            <h2>Choose your topic</h2>
            <div className="grid-container topic-grid-container">
                {/* eslint-disable-next-line array-callback-return */}
                {topics.map(({ name }) => {
                    switch (name) {
                        case 'Lifestyle and Daily Experiences':
                          return (
                            <div className="grid-item topic-user-area-grid-item topic-item1" onClick={() => navigate(`/articles?topic=${name}`)}>
                                <p className='topic-grid-title-font topic-grid-title-layout' style={{ width: '80%'}}>
                                    Lifestyle and Daily Experiences
                                </p>
                                <div style={{ height: '50%', margin: 'auto', marginTop: '5%'}}>
                                    <img
                                    style={{ height:'90%', objectFit: 'contain' }}
                                    src={lifeStyleAndDailyExperience}
                                    alt='lifestyle and daily experiences icon'></img>
                                </div>
                            </div>
                          )
                       
                        case 'Health and Wellness':
                          return                 <div className="grid-item topic-user-area-grid-item topic-item2 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                          <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                              <img
                              style={{ order: 1, maxWidth: '35%', height: 'auto', paddingRight: '3%' }}
                              src={healthAndWellness}
                              alt='Health and Wellness icon'>
                              </img>
                              <p
                              className='topic-grid-title-font'
                              style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '3%' }}>
                                  Health and Wellness
                              </p>
                          </div>
                      </div>
                        case 'Food and Cooking':
                            return                 <div className="grid-item topic-user-area-grid-item topic-item3 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                                <img
                                style={{ order: 1, maxWidth: '35%', height: 'auto', paddingRight: '3%' }}
                                src={foodAndCooking}
                                alt='Food and Cooking icon'>
                                </img>
                                <p
                                className='topic-grid-title-font'
                                style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '3%' }}>
                                    Food and Cooking
                                </p>
                            </div>
                        </div>
                        case 'Travel and Adventure':
                          return <div className="grid-item topic-user-area-grid-item topic-item4" onClick={() => navigate(`/articles?topic=${name}`)}>
                          <p
                          className='topic-grid-title-font topic-grid-title-layout'
                          style={{ width: '80%' }}>
                              Travel and Adventure
                          </p>
                          <div style={{ height: '90%' }}>
                              <img
                              style={{ height:'90%' }}
                              src={travelAndAdventure}
                              alt='travel and adventure icon'></img>
                          </div>
                      </div>
                        case 'Parenting and Family':
                          return                 <div className="grid-item topic-user-area-grid-item topic-item5" onClick={() => navigate(`/articles?topic=${name}`)}>
                          <p
                          className='topic-grid-title-font topic-grid-title-layout'
                          style={{ width: '50%' }}>
                              Parenting and Family
                          </p>
                          <div style={{ height: '60%', margin: 'auto'}}>
                              <img
                              style={{ height:'85%',marginTop: '2%' }}
                              src={parentingAndFamily}
                              alt='Parenting and Family icon'>
                              </img>
                          </div>
                      </div>
                        case 'Technology and Gadgets':
                            return <div className="grid-item topic-user-area-grid-item topic-item6 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                                <img
                                style={{ order: 1, maxWidth: '25%', height: 'auto', paddingRight: '3%' }}
                                src={technologyAndGadgets}
                                alt='technology and gadgets icon'>
                                </img>
                                <p
                                className='topic-grid-title-font'
                                style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '3%' }}>
                                    Technology and Gadgets
                                </p>
                            </div>
                        </div>
                        case 'Art and Creativity':
                          return                 <div className="grid-item topic-user-area-grid-item topic-item7" onClick={() => navigate(`/articles?topic=${name}`)}>
                          <p
                          className='topic-grid-title-font topic-grid-title-layout'
                          style={{ width: '80%' }}>
                              Art and Creativity
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', height: '80%', margin: 'auto'}}>
                              <img
                              style={{ width:'80%', margin: 'auto' }}
                              src={artAndCreativity}
                              alt='art and creativity icon'></img>
                          </div>
                      </div>
                        case 'Relationships and Dating':
                            return <div className="grid-item topic-user-area-grid-item topic-item8" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <p
                            className='topic-grid-title-font topic-grid-title-layout'
                            style={{ width: '80%' }}>
                                Relationships and Dating
                            </p>
                            <div
                            style={{ display: 'flex', alignItems: 'center', height: '80%', margin: 'auto'}}>
                                <img
                                style={{ width:'80%', margin: 'auto' }}
                                src={relationshipsAndDating}
                                alt='relationships and dating icon'>
                                </img>
                            </div>
                        </div>
                          case 'Inspiration and Motivation':
                            return   <div className="grid-item topic-user-area-grid-item topic-item9" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <p
                            className='topic-grid-title-font topic-grid-title-layout'
                            style={{ width: '80%' }}>
                                Inspiration and Motivation
                            </p>
                            <div style={{ height: '50%', margin: 'auto', marginTop: '5%'}}>
                                <img
                                style={{ height:'90%' }}
                                src={inspirationAndMotivation}
                                alt='inspiration and motivation icon'>
                                </img>
                            </div>
                        </div>
                          case 'Career and Professional Life':
                            return <div className="grid-item topic-user-area-grid-item topic-item10 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                                <img
                                style={{ order: 1, maxWidth: '35%', height: 'auto', paddingRight: '3%' }}
                                src={careerAndProfessionalLife}
                                alt='Career and Professional Life icon'>
                                </img>
                                <p
                                className='topic-grid-title-font'
                                style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '3%' }}>
                                    Career and Professional Life
                                </p>
                            </div>
                        </div>
                          case 'Education and Learning':
                            return   <div className="grid-item topic-user-area-grid-item topic-item11 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                                <img
                                style={{ order: 1, maxWidth: '30%', height: 'auto', paddingRight: '3%' }}
                                src={educationAndLearning}
                                alt='Education and Learning icon'>
                                </img>
                                <p
                                className='topic-grid-title-font'
                                style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '3%' }}>
                                    Education and Learning
                                </p>
                            </div>
                        </div>
                          case 'Hobbies and Interests':
                            return  <div className="grid-item topic-user-area-grid-item topic-item12" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <p
                            className='topic-grid-title-font topic-grid-title-layout'
                            style={{ width: '80%' }}
                            >
                                Hobbies and Interests
                            </p>
                            <div style={{ height: '70%', margin: 'auto'}}>
                                <img
                                style={{ height:'100%', marginTop: '8%' }}
                                src={hobbiesAndInterests}
                                alt='hobbies and interests icon'>
                                </img>
                            </div>
                        </div>
                          case 'Entertainment and Pop Culture':
                            return <div className="grid-item topic-user-area-grid-item topic-item13 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <div className='dis-flex-al-ctr'>
                                <img
                                style={{ order: 1, maxWidth: '35%', height: 'auto', paddingLeft: '8%' }}
                                src={entertainmentAndPopCulture}
                                alt='Entertainment
                                and Pop Culture icon'>
                                </img>
                                <p
                                className='topic-grid-title-font'
                                style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '5%' }}>
                                    Entertainment and Pop Culture Life
                                </p>
                            </div>
                        </div>
                          case 'Sports and Fitness':
                            return <div className="grid-item topic-user-area-grid-item topic-item14 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                                <img
                                style={{ order: 1, maxWidth: '40%', height: 'auto', paddingRight: '3%' }}
                                src={sportsAndFitness}
                                alt='Sports and Fitness icon'>
                                </img>
                                <p
                                className='topic-grid-title-font'
                                style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '3%' }}>
                                    Sports and Fitness
                                </p>
                            </div>
                        </div>
                          case 'Home and DIY':
                            return <div className="grid-item topic-user-area-grid-item topic-item15" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <p
                            className='topic-grid-title-font topic-grid-title-layout'
                            style={{ width: '50%' }}>
                                Home and DIY
                            </p>
                            <div style={{ display: 'flex', height: '80%', margin: 'auto'}}>
                                <img
                                style={{ width:'80%', margin: 'auto' }}
                                src={homeAndDiy}
                                alt='home and diy icon'>
                                </img>
                            </div>
                        </div>
                          case 'Politics and Religion':
                            return <div className="grid-item topic-user-area-grid-item topic-item16" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <p
                            className='topic-grid-title-font topic-grid-title-layout'
                            style={{ width: '80%' }}>
                                Politics and Religion
                            </p>
                            <div style={{ display: 'flex', height: '80%'}}>
                                <img
                                style={{ width:'80%', margin: 'auto' }}
                                src={politicsAndReligion}
                                alt='politics and religion icon'>
                                </img>
                            </div>
                        </div>
                          case 'Finance and Money':
                            return <div className="grid-item topic-user-area-grid-item topic-item17" onClick={() => navigate(`/articles?topic=${name}`)}>
                            <p
                            className='topic-grid-title-font topic-grid-title-layout'
                            style={{ width: '70%' }}>
                                Finance and Money
                            </p>
                            <div style={{ display: 'flex', height: '60%' }}>
                                <img
                                style={{ height:'85%', margin: 'auto' }}
                                src={financeAndMoney}
                                alt='finance and money icon'>
                                </img>
                            </div>
                        </div>
                          case 'Community and Social Causes':
                            return <div className="grid-item topic-user-area-grid-item topic-item18 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                    <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                        <img
                        style={{ order: 1, maxWidth: '40%', height: 'auto', paddingRight: '3%' }}
                        src={communityAndSocialCauses}
                        alt='Community and
                        Social Causes icon'></img>
                        <p
                        className='topic-grid-title-font'
                        style={{ order: 2, display: 'flex', width: '30%' }}>
                           Community and Social Causes
                        </p>
                    </div>
                </div>
                case 'Fiction and Creative Writing':
                    return <div className="grid-item topic-user-area-grid-item topic-item19 dis-flex-al-ctr" onClick={() => navigate(`/articles?topic=${name}`)}>
                    <div className='dis-flex-al-ctr' style={{ justifyContent: 'center' }}>
                        <img
                        style={{ order: 1, maxWidth: '40%', height: 'auto', paddingRight: '3%' }}
                        src={fictionAndCreativeWriting}
                        alt='Fiction and 
                        Creative Writing icon'>
                        </img>
                        <p
                        className='topic-grid-title-font'
                        style={{ order: 2, display: 'flex', width: '30%', paddingLeft: '3%' }}>
                            Fiction and Creative Writing
                        </p>
                    </div>
                </div>
                      }
                })}
            </div>
        </div>
    )
}

export default Topics;