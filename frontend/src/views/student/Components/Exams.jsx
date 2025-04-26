import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import BlankCard from '../../../components/shared/BlankCard';
import ExamCard from './ExamCard';
import { useGetExamsQuery } from 'src/slices/examApiSlice';

const Exams = () => {
  // Fetch exam data from the backend using useGetExamsQuery
  const { data: userExams, isLoading, isError, refetch } = useGetExamsQuery();

  useEffect(() => {
    refetch(); // Fetch exams data when the component mounts
  }, [refetch]);

  console.log('Exam User Data:', userExams);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching exams.</div>;
  }

  // Handle if no data is available
  if (!userExams || userExams.length === 0) {
    return <div>No exams available.</div>;
  }

  return (
    <PageContainer title="Exams" description="List of exams">
      <Grid container spacing={3}>
        {userExams.map((exam) => (
          <Grid item sm={6} md={4} lg={3} key={exam._id}>
            <BlankCard>
              <ExamCard exam={exam} />
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default Exams;
