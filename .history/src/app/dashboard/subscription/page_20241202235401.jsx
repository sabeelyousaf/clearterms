<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {loading ? (
    <div className="flex items-center justify-center h-64 col-span-full">
      <svg
        className="animate-spin h-10 w-10 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          fill="currentColor"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 000 8v4a8 8 0 01-8-8z"
        />
      </svg>
    </div>
  ) : (
    <>
      {subscription.map((sub) => (
        <div key={sub.id} className="bg-white rounded-lg shadow p-4">
          {sub.type === "daily" && (
            <ActiveSubscription
              title="Daily Plan"
              message="You have an active Daily subscription."
              features={planFeatures.daily}
              expiryDate={calculateExpiryDate(sub.created_at, sub.type)}
            />
          )}
          {sub.type === "monthly" && (
            <ActiveSubscription
              title="Monthly Plan"
              message="You have an active Monthly subscription."
              features={planFeatures.monthly}
              expiryDate={calculateExpiryDate(sub.created_at, sub.type)}
            />
          )}
          {sub.type === "yearly" && (
            <ActiveSubscription
              title="Yearly Plan"
              message="You have an active Yearly subscription."
              features={planFeatures.yearly}
              expiryDate={calculateExpiryDate(sub.created_at, sub.type)}
            />
          )}
        </div>
      ))}

      {!subscriptionTypes.includes("daily") && (
        <SubscriptionPlan
          title="Daily Plan"
          price={4.99}
          withPrice="day"
          features={planFeatures.daily}
          loading={loading}
          handleCheckout={() => handleCheckout(4.99, "24 Hours Plan")}
        />
      )}
      {!subscriptionTypes.includes("monthly") && (
        <SubscriptionPlan
          title="Monthly Plan"
          price={9.99}
          withPrice="month"
          features={planFeatures.monthly}
          loading={loading}
          handleCheckout={() => handleCheckout(9.99, "Monthly Plan")}
        />
      )}
      {!subscriptionTypes.includes("yearly") && (
        <SubscriptionPlan
          title="Yearly Plan"
          price={75}
          withPrice="year"
          features={planFeatures.yearly}
          loading={loading}
          handleCheckout={() => handleCheckout(75, "Yearly Plan")}
        />
      )}
    </>
  )}
</div>
