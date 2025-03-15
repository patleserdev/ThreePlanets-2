import styles from '@/styles/spaceIcon.module.css'

export default function PlanetsIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={styles.spaceIcon}
    
    >
      <rect width="100" height="100"  rx="15" />

      <circle cx="50" cy="50" r="25" stroke="gray" strokeDasharray="3 3" className={styles.circle1}/>
      <circle cx="50" cy="50" r="35" stroke="gray" strokeDasharray="3 3"className={styles.circle1} />

      <circle cx="75" cy="50" r="4" fill="lightblue" stroke="none" className={styles.circle2}/>
      <circle cx="85" cy="50" r="6" fill="orange" stroke="none" className={styles.circle2}/>

      <circle cx="50" cy="50" r="8" fill="yellow" stroke="none" className={styles.circle2}/>

      <path d="M10 20 h5 M12.5 17.5 v5" stroke="white" />
      <path d="M85 15 h5 M87.5 12.5 v5" stroke="white" />
      <path d="M20 80 h4 M22 78 v4" stroke="white" />
    </svg>
  );
}
