import React, { useState, memo, useEffect } from 'react'

// import HeaderDay from './HeaderDay'
// import CreateReportForm from './CreateReportForm'
import ReportItem from './ReportItem'
import FooterDay from './FooterDay'
// import ActivitySelect from "./ActivitySelect";
import DayCrate from './DayCrate';

function Day({
                numberOfDay,
                selectedDate,
                descriptions = [],
                addTimeReport,
                showEmpty,
                isOpenCreate,
                isOneProject,
                savePosition,
                selectDayStatus,
                selectedDayStatus,
                 setUserStatus
}) {
  const [isCreate, setIsCreate] = useState(true);
  const [isCreatedList, setIsCreatedList] = useState(false);
  const [classNameForEndAnimation, setClassNameForEndAnimation] = useState('');
  let [draganDroped , setDraganDroped] = useState(false);

  const handlerAddDayReport = (e) => {
    e.preventDefault()
    if (isCreate) {
     setClassNameForEndAnimation('close')
      return
    }
    setIsCreate(true)
  }

  useEffect(()=>{
    if(isCreate && descriptions.length){
      setIsCreate(false)
      setIsCreatedList(true)
     }
    },[descriptions, isCreate]);

  const openNewItem = ()=>{
    setIsCreate(!isCreate)
  }

  const day = new Date(selectedDate?.year, selectedDate?.month, numberOfDay)
  const dayOfWeek = day.getDay()

  let dayTitle = day.toLocaleDateString('en', {
    day: 'numeric',
    weekday: 'long',
    //month: 'long',
  })

    dayTitle = dayTitle.split(' ').reverse().join(', ');

  const todayStr = isOpenCreate ? '(today)' : ''
  const weekEndClassName =
    dayOfWeek === 0 || dayOfWeek === 6 ? 'text-danger' : ''
  const sumHours = descriptions.reduce(
    (sum, item) => (sum = sum + item.duration),
    0
  )

  const handlerEndAnimation = () => {
    if (classNameForEndAnimation) {
      setClassNameForEndAnimation('')
      setIsCreate(false)
    }
  }

  if (!showEmpty && !descriptions.length && !isOpenCreate) {
    return null
  }

  return (
    <div className="time_report_day_container" data-day={numberOfDay}>

      <DayCrate
        handlerAddDayReport={handlerAddDayReport}
        isCreate={isCreate}
        dayTitle={dayTitle}
        todayStr={todayStr}
        classNameForEndAnimation={classNameForEndAnimation}
        weekEndClassName={weekEndClassName}
        addTimeReport={addTimeReport}
        numberOfDay={numberOfDay}
        selectedDate={selectedDate}
        setIsCreate={setIsCreate}
        isOpenCreate={isOpenCreate}
        extraClassName={classNameForEndAnimation}
        handlerEndAnimation={handlerEndAnimation}
        sumHours={sumHours}
        savePosition={savePosition}
        isCreateList={isCreatedList}
        selectDayStatus={selectDayStatus}
        selectedDayStatus={selectedDayStatus}
        setUserStatus={setUserStatus}
        descriptions={descriptions}
      />
      {descriptions.length ? <div className='reports_item_list'>
        {descriptions.map(({ title, duration, id }, index) => (
          <ReportItem
            key={id}
            index={index}
            text={title}
            hours={duration}
            opneNewItem={openNewItem}
            dayTitle={dayTitle}
            id={id}
            isOneProject={isOneProject}
            slecet
            selectDayStatus={selectDayStatus}
            selectedDayStatus={selectedDayStatus}
            isCreate={isCreate}
            setUserStatus={setUserStatus}
            setDraganDroped={setDraganDroped}
            draganDroped={draganDroped}
          />
        ))}
      </div> : null}
      {sumHours ?<FooterDay
         sumHours={sumHours}
      /> : null}
    </div>
  )
}

const shouldComponentUpdate = (prevProps, nextProps) => {
  if (
    JSON.stringify(prevProps.descriptions) !==
      JSON.stringify(nextProps.descriptions) ||
    prevProps.numberOfDay !== nextProps.numberOfDay ||
    prevProps.selectedDate.year !== nextProps.selectedDate.year ||
    prevProps.selectedDate.month !== nextProps.selectedDate.month ||
    prevProps.showEmpty !== nextProps.showEmpty ||
    prevProps.isOpenCreate !== nextProps.isOpenCreate
  ) {
    return false
  }
  return true
}

export default memo(Day, shouldComponentUpdate)
