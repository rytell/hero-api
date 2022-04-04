export const heroFromProps = (heroProps: any[]) => {
  return {
        staked: heroProps[0],
        lastStaked: heroProps[1],
        lastUnstaked: heroProps[2],
        heroId: heroProps[3],
        owner: heroProps[4],
    };
};
